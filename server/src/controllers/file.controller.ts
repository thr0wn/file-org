import * as express from 'express';
import * as mongoose from 'mongoose';
import * as multer from 'multer';
import * as q from 'q';
import * as path from 'path';
import * as constants from '../config/constants';
import {File} from '../models/file.model';

export class FileController {
	public create(req: express.Request, res: express.Response, next: express.NextFunction): void {
		FileController.uploadHandler(req, res)
			.then(() => {
				if (!req.body || !req.body.name || !req.body.tags || !req.file) {
					res.sendStatus(400);
					return;
				}
				var file = new File();
				file._id = req.file.filename.replace(/\..+$/, '');
				file.name = req.body.name;
				file.name = req.body.name;
				file.desc = req.body.desc;
				file.tags = (<string>req.body.tags).split(',');
				file.path = req.file.filename;
				return file.save();
			})
			.then((result) => {
				if(result) {
					res.sendStatus(200);
				}
			})
			.catch(next);
	}
	public list(req: express.Request, res: express.Response, next: express.NextFunction): void {
		File.find({})
			.populate('tags')
			.exec()
			.then((files) => {
				res.status(200).send(files);
			})
			.catch(next);
	}
	static uploadHandler = (() => {
		var storage = multer.diskStorage({
			destination: (req, file, cb) => cb(null, constants.UPLOAD_DIR),
			filename: (req, file, cb) => {
				var id = new mongoose.Types.ObjectId();
				var filemedata = path.parse(file.originalname);
				cb(null, id + filemedata.ext);
			}
		});
		var multerOptions: multer.Options = {
			dest: constants.UPLOAD_DIR,
			storage: storage
		};
		var rawUploadHandler = multer(multerOptions).single('file');
		return q.nbind(rawUploadHandler, rawUploadHandler);
	})();
}