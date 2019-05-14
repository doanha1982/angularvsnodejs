import * as mongoose from "mongoose";
import { BookSchema } from "../models/bookModel";
import { Request, Response } from "express";

const Book = mongoose.model('Book', BookSchema);

export class BookController {
    public welcome(req: Request, res: Response) {
        res.status(200)
            .send({ message: 'welcome restful api - demo' });
    }
    public all(req: Request, res: Response) {
        Book.find({}, (err, data) => {
            if (err)
                res.send(err);
            res.json(data);
        });
    }
    public find(req: Request, res: Response) {
        Book.find({ isbn: req.params.isbn }, (err, data) => {
            if (err)
                res.send(err);
            res.json(data);
        })
    }
    public add(req: Request, res: Response) {
        var new_book = new Book(req.body);
        new_book.save((err, data) => {
            if (err)
                res.send(err);
            res.json(data);
        });
    }
    public update(req: Request, res: Response) {
        Book.findOneAndUpdate({ isbn: req.params.isbn }, req.body, { new: true }, (err, data) => {
            if (err)
                res.send(err);
            res.json(data);
        });
    }
    public delete(req: Request, res: Response) {
        Book.remove({ isbn: req.params.isbn }, (err, data) => {
            if (err)
                res.send(err);
            res.json(data);
        });
    }
}