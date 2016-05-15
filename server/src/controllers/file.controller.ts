import * as express from 'express';
import * as multer from 'multer';
import * as q from 'q';
import * as constants from '../config/constants';
import {File} from '../models/file.model';

export class FileController {
	static upload = multer({ dest: constants.UPLOAD_DIR }).single('file');
	static qUpload = (() =>
		q.nbind(FileController.upload, FileController.upload)
	)();

	public create(req: express.Request, res: express.Response, next: express.NextFunction): void {
		FileController.qUpload(req, res)
			.then(() => {
				if (!req.body || !req.body.name || !req.body.tags || !req.file) {
					res.sendStatus(400);
					return;
				}
				var name = req.body.name;
				var desc = req.body.desc;
				var tags = JSON.parse(req.body.tags);
				return new File({ name, desc, tags }).save();
			})
			.then((result) => {
				if (result) {
					res.sendStatus(200);
				}
			})
			.catch(next);
	}
	public list(req: express.Request, res: express.Response, next: express.NextFunction): void {
		File.find({})
			.exec()
			.then((files) => {
				res.status(200).send(files);
			})
			.catch(next);
	}
}