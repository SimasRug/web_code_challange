# CodeExercise

This project was generated with [Create React App](https://github.com/facebook/create-react-app)
This repository contains the code for **Adidas Code Exercise**, based on React framework.

## Installation
`git` and `node` have _step-by-step_ documentation which allows you to successfully install this software on your machine:

- [Git installation process][git-installation],
- [node installation process][node-installation].

Now that your system is ready, you can clone the project repository from [Github][github]:

```bash
git clone git clone https://github.com/SimasRug/web_code_challange
```

Install `node` dependencies inside your project folder:

```bash
$ cd /path/to/project
$ npm install
```
## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.



## Notes

- I would usually not commit `.env` file but, considering this is just for demonstration purposes. There's no harm.


- Having issues with `apiService.js` `POST` call. It seems to successfully complete the request, after looking at the request body. I don't see the passed parameters. 
I'm either missing something in the API documentation. Or it's a `cors origin` issue. Or something with API itself. Not sure.


- Should've pain more attention to specific versions of react, running into all sorts of problems with `Enzyme`. I know `@wojtekmaj/enzyme-adapter-react-17` is not an official package.
But it works for this case.