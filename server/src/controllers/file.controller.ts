import * as express from 'express';
import * as multer from 'multer';
import * as q from 'q';
import * as constants from '../config/constants';
import {FileModel} from '../models/file.model';

export class FileController {
	private upload = multer({ dest: constants.UPLOAD_DIR }).single('file');

	public create(req: express.Request, res: express.Response): void {
		var upload = Q.nbind(this.upload, this.upload);
		upload(req, res)
			.then(() => {
				if (!req.body) {
					throw new TypeError('Invalid request parameters');
				}
				var name = req.body.name;
				var desc = req.body.desc;
				var tags = JSON.parse(req.body.tags);
				return new FileModel({name, desc, tags}).save();
			})
			.then((document) => {
				res.json(document);
			})
			.catch((err) => {
				console.trace(err);
				res.status(500).end();
			});
	}
}