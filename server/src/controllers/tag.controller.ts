import * as express from 'express';
import * as constants from '../config/constants';
import {Tag} from '../models/tag.model';

export class TagController {
	public create(req: express.Request, res: express.Response, next: express.NextFunction): void {
		var tag = new Tag(req.body);
		tag.save()
			.then(() => {
				res.sendStatus(200);
			})
			.catch((err) => {
				// err.code === 11000 (not unique name)
				if (err.errors && err.errors['name'] || err.code === 11000) {
					res.sendStatus(400);
				} else {
					next(err);
				}
			});
	}
	public list(req: express.Request, res: express.Response, next: express.NextFunction): void {
		Tag.find({})
			.exec()
			.then((tags) => {
				res.status(200).send(tags);
			})
			.catch((err) => {
				next(err);
			});
	}
}