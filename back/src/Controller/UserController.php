<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Contracts\Cache\ItemInterface;
use Symfony\Contracts\Cache\TagAwareCacheInterface;
use JMS\Serializer\SerializerInterface;
use JMS\Serializer\SerializationContext;
use Nelmio\ApiDocBundle\Annotation\Model;
use OpenApi\Attributes as OA;

class UserController extends AbstractController
{
    /**
     * Cette méthode permet de récupérer l'ensemble des utilisateurs
     */
    // Définition d'une route pour obtenir tous les utilisateurs via une requête GET.
    #[Route('api/users', name: 'users', methods: ['GET'])]
    #[OA\Response(
        response: 200,
        description: "Retourne la liste des utilisateurs",
        content: new OA\JsonContent(
            type: "array",
            items: new OA\Items(ref: new Model(type: User::class, groups: ["getUsers"]))
        )
    )]
    #[OA\Parameter(
        name: "page",
        in: "query",
        description: "La page que l'on veut récupérer",
        schema: new OA\Schema(type: "integer")
    )]
    #[OA\Parameter(
        name: "limit",
        in: "query",
        description: "Le nombre d'élément qu' l'on veut récupérer",
        schema: new OA\Schema(type: "integer")
    )]
    #[OA\Tag(name: 'Users')]
    public function getAllUsers(UserRepository $userRepository, SerializerInterface $serializer, Request $request, TagAwareCacheInterface $cache): JsonResponse
    {
        $page = $request->get('page', 1);
        $limit = $request->get('limit', 15);

        $idcache = "getAllUsers-" . $page . "-" . $limit;
        $jsonUserList = $cache->get($idcache, function (ItemInterface $item) use ($userRepository, $page, $limit, $serializer) {
            $item->tag('userCache');
            $userList = $userRepository->findAllWithPagination($page, $limit);
            $context = SerializationContext::create()->setGroups(['getUsers']);
            return $serializer->serialize($userList, 'json', $context);
        });
        // Retour d'une réponse JSON avec la liste des utilisateurs
        return new JsonResponse($jsonUserList, Response::HTTP_OK, [], true);
    }

    /**
     * Cette méthode permet de récupérer un utilisateur spécifique par son ID
     */
    // Définition d'une route pour obtenir les détails d'un utilisateur spécifique via une requête GET.
    #[Route('/api/users/{id}', name: 'detailUser', methods: ['GET'])]
    #[OA\Tag(name: "Users")]
    public function getUserDetails(User $user, SerializerInterface $serializer): JsonResponse
    {
        $context = SerializationContext::create()->setGroups(['getUsers']);
        // Sérialisation de l'utilisateur spécifié en JSON.
        $jsonUser = $serializer->serialize($user, 'json', $context);
        // Retour d'une réponse JSON avec les détails de l'utilisateur.
        return new JsonResponse($jsonUser, Response::HTTP_OK, [], true);
    }

    /**
     * Cette méthodde supprimer un utilisateur en fonction de son id
     */
    // Définition d'une route pour supprimer un utilisateur spécifique via une requête DELETE.
    #[Route('/api/users/{id}', name: 'deleteUser', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\avez pas les droits suffisants pour supprimer un Utilisateur.')]
    #[OA\Tag(name: "Users")]
    public function deleteUserr(User $user, EntityManagerInterface $em, UserRepository $userRepository, TagAwareCacheInterface $cachePool): JsonResponse
    {
        $cachePool->invalidateTags(["usersCache"]);
        // Suppression de l'user de la base de données.
        $em->remove($user);
        // Application des changements dans la base de données.
        $em->flush();
        // Retour d'une réponse JSON indiquant que l'user a été supprimé.
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * Cette méthode permet de mettre à jour un utilisateur
     */
    // Définition d'une route pour mettre à jour un utilisateur spécifique via une requête PUT.
    #[Route('/api/users/{id}', name: 'updateUser', methods: ['PUT'])]
    #[OA\Put(
        path: "/api/users/{id}",
        summary: "Met à jour un utilisateur existant",
        tags: ["Users"],
        requestBody: new OA\RequestBody(
            description: "Données de l'utilisateur à mettre à jour",
            required: true,
            content: new OA\JsonContent(
                ref: new Model(type: User::class, groups: ["update"])
            )
        ),
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                description: "ID de l'utilisateur à mettre à jour",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(
                response: 204,
                description: "Utilisateur mis à jour avec succès",
                content: new OA\JsonContent(
                    type: "object",
                    properties: [
                        new OA\Property(property: "email", type: "string"),
                        new OA\Property(property: "password", type: "string"),
                    ]
                )
            ),
            new OA\Response(
                response: 400,
                description: "Données invalides fournies"
            ),
            new OA\Response(
                response: 404,
                description: "Utilisateur non trouvé"
            )
        ]
    )]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\avez pas les droits suffisants pour modifier un Utilisateur.')]
    #[OA\Tag(name: "Users")]
    public function updateUser(Request $request, SerializerInterface $serializer, User $currentUser, EntityManagerInterface $em, ValidatorInterface $validator, TagAwareCacheInterface $cachePool): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email']) || empty($data['email'])) {
            return new JsonResponse(['status' => 400, 'message' => 'L\'email est obligatoire.'], JsonResponse::HTTP_BAD_REQUEST);
        }

        if (!isset($data['password']) || empty($data['password'])) {
            return new JsonResponse(['status' => 400, 'message' => 'Le mot de passe est obligatoire.'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $currentUser->setEmail($data['email']);
        $currentUser->setPassword(password_hash($data['password'], PASSWORD_BCRYPT));

        $errors = $validator->validate($currentUser);
        if ($errors->count() > 0) {
            return new JsonResponse($serializer->serialize($errors, 'json'), JsonResponse::HTTP_BAD_REQUEST, [], true);
        }

        $em->persist($currentUser);
        $em->flush();
        $cachePool->invalidateTags(["usersCache"]);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
