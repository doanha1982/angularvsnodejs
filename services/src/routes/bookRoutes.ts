import { BookController } from "../controllers/bookController";
export class Routes {
    private bookController: BookController = new BookController();
    //define method
    public routes(app): void {
        //define route
        app.route('/')
            .get(this.bookController.welcome);
        app.route('/book')
            .get(this.bookController.all)
            .post(this.bookController.add);
        app.route('/book/:isbn')
            .get(this.bookController.find)
            .put(this.bookController.update)
            .delete(this.bookController.delete);
    }

}