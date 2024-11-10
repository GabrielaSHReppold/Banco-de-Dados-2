import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller';
import { CreateUsuarioMiddleware } from '../middlewares/usuario/create-middleware';
import { UpdateUsuarioMiddleware } from '../middlewares/usuario/update-middleware';
import { ValidateUuidMiddleware } from '../middlewares/validate_uuid.middleware';
import { AuthMiddleware } from '../middlewares/auth/auth.middleware';

export class UsuarioRoutes {
  public static execute(): Router {
    const router = Router();

    // CREATE - POST
    router.post(
      '/usuarios',
      [
        AuthMiddleware.validate,
        CreateUsuarioMiddleware.validateRequired,
        CreateUsuarioMiddleware.validateTypes,
        CreateUsuarioMiddleware.validateData
      ],
      UsuarioController.create
    );

    // FIND ALL - GET
    router.get(
      '/usuarios',
      [AuthMiddleware.validate],
      UsuarioController.findAll
    );

    // FIND ONE - GET
    router.get(
      '/usuarios/:id',
      [
        AuthMiddleware.validate,
        ValidateUuidMiddleware.validate
      ],
      UsuarioController.findOneById
    );

    // UPDATE - PUT
    router.put(
      '/usuarios/:id',
      [
        AuthMiddleware.validate,
        ValidateUuidMiddleware.validate,
        UpdateUsuarioMiddleware.validateTypes,
        UpdateUsuarioMiddleware.validateData
      ],
      UsuarioController.update
    );

    // REMOVE - DELETE
    router.delete(
      '/usuarios/:id',
      [
        AuthMiddleware.validate,
        ValidateUuidMiddleware.validate
      ],
      UsuarioController.remove
    );

    return router;
  }
}
