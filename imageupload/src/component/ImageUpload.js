import React, { Component } from "react";
import "./ImageUpload.css";
import * as firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDv13X8I-wfOBYEUpIVogridr-s2o4nadA",
	authDomain: "webapp-286016.firebaseapp.com",
	databaseURL: "https://webapp-286016.firebaseio.com",
	projectId: "webapp-286016",
	storageBucket: "webapp-286016.appspot.com",
	messagingSenderId: "914925911812",
	appId: "1:914925911812:web:775042e3a15b66dbf35a51",
	measurementId: "G-G4SVSBLKDD"
  };

firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();

export default class ImageUpload extends Component {
	state = {
		start: true,
		showImage: false,
		progressBar: false,
		value: 0.1,
		phoneNumber: "",
		filename: "",
		file: null,
		showPhoneNo: false,
	};

	fileUploadHandler = (e) => {
		console.log(e.target);
		const data = new FormData();
		data.append("file", e.target.files[0]);
		data.append("filename", "1.jpg");
		fetch("http://127.0.0.1:5000/upload", {
			method: "POST",
			body: data,
		}).then((res) => {
			res.json().then((result) => {
				console.log(result);
				// let docRef = db.collection("textData").doc(result.filename);

				// let setAda = docRef.set({
				// 	mobile_no: result.mobile_no,
				// 	filename: result.filename,
				// });
				this.setState({
					phoneNumber: result.mobile_no,
					filename: result.filename,
					showPhoneNo: true,
				});
			});
		});
		this.setState({
			showImage: true,
			progressBar: true,
			start: false,
			value: 0.1,
			file: URL.createObjectURL(e.target.files[0]),
		});
		this.progressBarValue();
	};

	progressBarValue = () => {
		setInterval(() => {
			if (this.state.value < 1) {
				this.setState({ value: this.state.value + 0.1 });
			}
		}, 400);
	};

	render() {
		// console.log(this.state);
		return (
			<div>
				<h2>File Upload & Image Preview</h2>
				<p className="lead">
					No Plugins <b>Just Javascript</b>
				</p>

				<form id="file-upload-form" className="uploader">
					<input
						id="file-upload"
						type="file"
						name="fileUpload"
						accept="image/*"
						onChange={this.fileUploadHandler}
					/>

					<label htmlFor="file-upload" id="file-drag">
						{this.state.showImage ? (
							<img
								id="file-image"
								src={this.state.file}
								alt="Preview"
								className=""
							/>
						) : (
							""
						)}

						{this.state.start ? (
							<div id="start" className="">
								<i
									className="fa fa-download"
									aria-hidden="true"
								></i>
								<div>Select a file or drag here</div>
								<div id="notimage" className="hidden">
									Please select an image
								</div>
								<span
									id="file-upload-btn"
									className="btn btn-primary"
								>
									Select a file
								</span>
							</div>
						) : (
							""
						)}
						{this.state.progressBar ? (
							<div id="response" className="">
								<div id="messages"></div>
								<progress
									className="progress"
									id="file-progress"
									value={this.state.value}
								>
									<span>0</span>%
								</progress>
							</div>
						) : (
							""
						)}
					</label>
					{this.state.showPhoneNo && this.state.value >= 1 ? (
						<label>
							<h1>
								Extrated Phone Number : {this.state.phoneNumber}
							</h1>
							<p>Filename : {this.state.filename}</p>
						</label>
					) : (
						""
					)}
				</form>
			</div>
		);
	}
}
