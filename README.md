# Avra.Me Portfolio Showcase
This is a custom resume using React, NextJS and Netlify CMS

Goals:

- [x] I want to be able to customize my online portfolio without touching my code.
- [x] I want my portfolio to look modern and be responsive.
- [x] I want my portfolio to be customizable at a technical level should I feel like it.
- [x] I want my portfolio to be snappy on modern devices.
- [x] It should look kind of acceptable with js disabled.
- [ ] As a stretch goal, I would like to be able to print out my portfolio as a resume
- [ ] Todo: Create a 'Template' version of this code to allow others to implement it themselves.

#### Node.js 12+ (versions below could work, but are not tested)

- Linux:

  ```
  sudo apt install nodejs npm
  ```

- Windows or macOS:

  https://nodejs.org/en/

### Installing

1. Clone the repository

   ```
   git clone https://github.com/avra-me/avra-me.nextjs.github.io
   ```

2. Install dependencies, this can take a minute

   ```
   cd <name of dir>
   yarn
   ```

3. Start the local server

   ```
   yarn start
   ```

Your browser should now open and show the app. Otherwise open http://localhost:3000/ in your browser. Editing files will automatically refresh the page.

### What to do next?

If you are new to React, you should watch a [basic React tutorial](https://www.youtube.com/results?search_query=react+tutorial) first.

If you already know React, then most of the information you need is in the [Material-UI documentation](https://material-ui.com/getting-started/usage/).

You can go into [src/theme.js](/src/theme.js) and change the primary and secondary color codes at the top of the script to the values you like and some magic will happen.

## Deployment

If you are happy with the state of your website you can run:

```
yarn build
```

It will create a folder named `out` with your compiled project inside. After that copy its contents into your webroot and you are ready to go.

## Built on top of

- [NextJs](https://nextjs.org/) - Generating a static site from dynamic content, nextjs supports server-side logic but we don't use it.
- [Netlify CMS](https://netlifycms.org/) - A Version controlled content management system, enables content changes without touching the code
- [Material-UI](https://github.com/mui-org/material-ui) - Material Design components
- [Framer-Motion](https://www.framer.com/api/motion/) - Managed animation handling, could look for a lighter-weight library in future

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/avra-me/avra-me.github.io/blob/master/LICENSE) file for details.
