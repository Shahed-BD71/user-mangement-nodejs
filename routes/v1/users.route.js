const express = require("express");
const userControllers = require("../../controllers/users.controller");
const { limiter } = require("../../middleware/rate.limit");
const router = express.Router();

/**
 * @api {get} /users All or a Random user
 * @apiDescription Get all or a random the users
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-}}         [page=1]     List page
 * @apiParam  {Number{1-100}}      [limit=10]  Users per page
 *
 * @apiSuccess {Object[]} all the users.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */

router.route("/random").get(userControllers.getRandomUser);
router.route("/all").get(userControllers.getAllUsers);

/**
 * @api {post} /api/user Create user
 * @apiName Create new user
 * @apiPermission admin
 * @apiGroup User
 *
 * @apiParam  {String} [userName] username
 * @apiParam  {String} [email] Email
 * @apiParam  {String} [phone] Phone number
 * @apiParam  {String} [status] Status
 *
 * @apiSuccess (200) {Object} mixed `User` object
 */

/**
 * @api {post} /users save a user
 * @apiDescription Get all the users
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-}}         [page=1]     List page
 * @apiParam  {Number{1-100}}      [limit=10]  Users per page
 *
 * @apiSuccess {Object[]} all the users.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
router.route("/save").post(userControllers.addUser);

/**
 * @api {get} /users/:id get a specifics or chosen user
 * @apiDescription Get get a specifics or chosen user
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token 
 *
/**
 * @api {get} /user/:id
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost/user/4711
 */
router.route("/:id").get(limiter, userControllers.detailsUser);
/**
 * @api {get} /users/:id Update a specifics or chosen user
 * @apiDescription Update get a specifics or chosen user
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token 
 *
 * @apiParam  {Number{1-}}         [page=1]     List page
 * @apiParam  {Number{1-100}}      [limit=10]  Users per page
 *
 * @apiSuccess {Object[]} all the users.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
router.route("/update/:id").patch(userControllers.updateUser);
/**
 * @api {get} /users/:id Update a specifics or chosen user all data
 * @apiDescription Update a specifics or chosen user all data
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token 
 *
 * @apiParam  {Number{1-}}         [page=1]     List page
 * @apiParam  {Number{1-100}}      [limit=10]  Users per page
 *
 * @apiSuccess {Object[]} all the users.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
router.route("/bulk-update/:id").put(userControllers.updateUserData);
router.route("/delete/:id").delete(userControllers.deleteUser);

module.exports = router;
