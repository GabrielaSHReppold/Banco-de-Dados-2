import { Router } from 'express';
import { LikeController } from '../controllers/like.controller';
import { CreateLikeMiddleware } from '../middlewares/like/create-middleware';
import { ValidateUuidMiddleware } from '../middlewares/validate_uuid.middleware';
import { AuthMiddleware } from '../middlewares/auth/auth.middleware';

export class LikeRoutes {
  public static execute(): Router {
    const router = Router();

    // CREATE - POST
    router.post(
      '/likes',
      [
        AuthMiddleware.validate,
        CreateLikeMiddleware.validateRequired,
        CreateLikeMiddleware.validateTypes,
      ],
      LikeController.create
    );

    // FIND ALL - GET
    router.get(
      '/likes',
      [AuthMiddleware.validate],
      LikeController.findAll
    );

    // FIND ONE - GET
    router.get(
      '/likes/:id',
      [
        AuthMiddleware.validate,
        ValidateUuidMiddleware.validate
      ],
      LikeController.findOneById
    );

    // REMOVE - DELETE
    router.delete(
      '/likes/:id',
      [
        AuthMiddleware.validate,
        ValidateUuidMiddleware.validate
      ],
      LikeController.remove
    );

    return router;
  }
}
