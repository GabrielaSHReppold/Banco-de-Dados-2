import { Router } from 'express';
import { TweetController } from '../controllers/tweet.controller';
import { CreateTweetMiddleware } from '../middlewares/tweet/create-middleware';
import { UpdateTweetMiddleware } from '../middlewares/tweet/update-middleware';
import { ValidateUuidMiddleware } from '../middlewares/validate_uuid.middleware';
import { AuthMiddleware } from '../middlewares/auth/auth.middleware';

export class TweetRoutes {
  public static execute(): Router {
    const router = Router();

    // CREATE - POST
    router.post(
      '/tweets',
      [
        AuthMiddleware.validate,
        CreateTweetMiddleware.validateRequired,
        CreateTweetMiddleware.validateTypes,
        CreateTweetMiddleware.validateData
      ],
      TweetController.create
    );

    // FIND ALL - GET
    router.get(
      '/tweets',
      [AuthMiddleware.validate],
      TweetController.findAll
    );

    // FIND ONE - GET
    router.get(
      '/tweets/:id',
      [
        AuthMiddleware.validate,
        ValidateUuidMiddleware.validate
      ],
      TweetController.findOneById
    );

    // UPDATE - PUT
    router.put(
      '/tweets/:id',
      [
        AuthMiddleware.validate,
        ValidateUuidMiddleware.validate,
        UpdateTweetMiddleware.validateTypes,
        UpdateTweetMiddleware.validateData
      ],
      TweetController.update
    );

    // REMOVE - DELETE
    router.delete(
      '/tweets/:id',
      [
        AuthMiddleware.validate,
        ValidateUuidMiddleware.validate
      ],
      TweetController.remove
    );

    return router;
  }
}
