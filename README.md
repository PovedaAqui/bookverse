<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/povedaaqui/bookverse">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Bookverse Frontend (deprecated)</h3>

  <p align="center">
    Bookverse is a Digital Collectible Books (cBooks) Marketplace (also know as NFTBooks)
    <br />
    <a href="https://github.com/povedaaqui/bookverse"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://bookverse.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/povedaaqui/bookverse/issues">Report Bug</a>
    ·
    <a href="https://github.com/povedaaqui/bookverse/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Bookverse is a new alternative to buy, sell, and read digital books. Thanks to the blockchain technology, sellers and publishers are been able to get up to 99% royalties, and for the firs time ever in this market, resale royalties as well. The users will be able to read their favorite collectibles using the incoming in-app reader and any third party reader. Also, they will be able to resell their cBooks in secondary marketplaces. The applications are just limited by our imagination.

Demo: <a href="https://bookverse.vercel.app/">view demo</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![TailwindCSS][TailwindCSS]][TailwindCSS-url]
* [![wagmi.sh][wagmi.sh]][wagmi-url]
* [![Thirdweb][Thirdweb.com]][Thirdweb-url]
* [![Tatum][Tatum]][Tatum-url]
* [![NFT.storage][NFT.storage]][NFT.storage-url]
* [![Chainlink][Chainlink]][Chainlink-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Follow this guide to make it works locally.

### Installation

1. Get a free API Key at [tatum.io](https://tatum.io) and [alchemy.com](https://alchemy.com)
2. Clone the repo
   ```sh
   git clone https://github.com/povedaaqui/bookverse.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create an .env file and Enter your APIs in `env`
   ```js
   const REACT_APP_ALCHEMY_KEY = 'ENTER YOUR API';
   const REACT_APP_TATUM = 'ENTER YOUR API';
   ```
5. Choose the chain for Tatum and add it to `env`
   ```js
   const REACT_APP_CHAIN = 'MATIC';
   ```
6. Create Edition Drop contract on Thirdweb, then, add it to `env`
   ```js
   const REACT_APP_DROP_CONTRACT = 'ENTER YOUR CONTRACT ADDRESS';
   ```
7. We're using a relayer to avoid gas fees for users, provided by Openzeppelin, create yours, then, add it to `env`
   ```js
   const REACT_APP_WEBHOOK_URL = 'ENTER YOUR OPENZEPPELIN RELAY ADDRESS';
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

First of all, create an Edition Drop Contract in thirdweb, mint some NFTs for testing, just the NFTs minted in this contract will be shown in MyBooks page (as long as you're holding it in the connected wallet). Find a metadata example in the metadata folder included in this repo.

The NFTs listed in the contract should appear on the Store page.

_For more examples, please refer to the [Documentation](https://github.com/PovedaAqui/bookverse)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Improve UI/UX
- [ ] Improve MyBooks page
- [ ] Create a backend
- [ ] Implement someday pending changes
- [ ] Fix bugs

See the [open issues](https://github.com/povedaaqui/bookverse/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Luis - [@povedaaqui](https://twitter.com/povedaaqui) - luis.poveda9321@gmail.com
Juan - [@juansamitier](https://twitter.com/juansamitier) - juan.samitier077@gmail.com
Project Link: [https://github.com/povedaaqui/bookverse](https://github.com/povedaaqui/bookverse)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Tatum](https://tatum.io)
* [Thirdweb](https://thirdweb.com)
* [wagmi.sh](https://wagmi.sh)
* [Alchemy](https://alchemy.com)
* [Chainlink](https://chain.link)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/povedaaqui/bookverse.svg?style=for-the-badge
[contributors-url]: https://github.com/povedaaqui/bookverse/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/povedaaqui/bookverse.svg?style=for-the-badge
[forks-url]: https://github.com/povedaaqui/bookverse/network/members
[stars-shield]: https://img.shields.io/github/stars/povedaaqui/bookverse.svg?style=for-the-badge
[stars-url]: https://github.com/povedaaqui/bookverse/stargazers
[issues-shield]: https://img.shields.io/github/issues/povedaaqui/bookverse.svg?style=for-the-badge
[issues-url]: https://github.com/povedaaqui/bookverse/issues
[license-shield]: https://img.shields.io/github/license/povedaaqui/bookverse.svg?style=for-the-badge
[license-url]: https://github.com/povedaaqui/bookverse/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/luiscarlospoveda
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com
[wagmi.sh]: https://img.shields.io/badge/wagmi.sh-wagmi.sh-black
[wagmi-url]: https://wagmi.sh
[nftport.xyz]: https://img.shields.io/badge/nftport.xyz-nftport.xyz-black
[Thirdweb.com]: https://img.shields.io/badge/thirdweb.com-thirdweb.com-purple
[Thirdweb-url]: https://thirdweb.com
[Chainlink]: https://img.shields.io/badge/chainlink-chain.link-blue
[Chainlink-url]: https://chain.link
[NFT.storage]: https://img.shields.io/badge/NFT.storage-NFT.storage-yellow
[NFT.storage-url]: https://nft.storage
[Tatum]: https://img.shields.io/badge/Tatum-Tatum.io-blue
[Tatum-url]: https://tatum.io