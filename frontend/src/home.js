import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress } from "@material-ui/core";
import cblogo from "./cblogo.PNG";
import imagebg from "./bgg.jpg";
import back from "./ilustration.png";
import back2 from "./back2.jpg";
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';





const axios = require("axios").default;


export const ImageUpload = () => {

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0;
  let description = ''

  const dataArray = [
    {
      label: "Early Blight",
      description: " La brûlure bactérienne est une maladie courante des plantes qui affecte diverses cultures en particulier les tomates et les pommes de terre Elle est causée par le champignon Alternaria solani. La brûlure bactérienne se manifeste généralement sur les feuilles inférieures des plantes et peut se propager vers le haut si elle nest pas contrôlée. Voici quelques caractéristiques clés et des stratégies de gestion pour la brûlure bactérienne ",
      solution: "Rotation des cultures : Évitez de planter des tomates ou des pommes de terre au même endroit pendant des années consécutives.Variétés résistantes : Choisissez des variétés résistantes lorsque cela est possible. Espacement adéquat : Assurez-vous d'un espacement adéquat entre les plantes pour favoriser la circulation de l'air et réduire l'humidité autour des feuilles. Paillage : Appliquez du paillis autour de la base des plantes pour réduire les éclaboussures de sol sur les feuilles inférieures.Fongicides : Dans les cas graves, des fongicides contenant du cuivre ou d'autres ingrédients actifs approuvés peuvent être utilisés. Le moment de l'application est crucial, et il est préférable de commencer avant l'apparition des symptômes. Élagage : Retirez les feuilles infectées et éliminez les branches inférieures pour améliorer la circulation de l'air. Gestion de l'eau : Arrosez le sol directement à la base de la plante et évitez l'arrosage par le haut."
    },
    {
      label: "Late Blight",
      description: "La mildiou, également connue sous le nom de mildiou tardif, est une maladie des plantes causée par le champignon oomycète Phytophthora infestans. Cette maladie est particulièrement redoutée car elle peut causer des ravages importants dans les cultures de pommes de terre et de tomates. Voici des informations sur les symptômes et les stratégies de gestion de la mildiou ",
      solution: "Choisissez des variétés de pommes de terre et de tomates résistantes à la mildiou lorsque cela est possible.Rotation des cultures : Évitez de planter des pommes de terre et des tomates au même endroit pendant plusieurs années. Évitez l'arrosage par le haut : Arrosez les plantes à la base pour éviter de mouiller le feuillage. Élimination des feuilles infectées : Retirez et détruisez les feuilles infectées pour réduire la propagation de la maladie.Fongicides : L'application préventive de fongicides peut être nécessaire dans les zones à risque élevé. Les fongicides à base de cuivre sont souvent utilisés.Aération : Assurez-vous que les plantes bénéficient d'une bonne circulation d'air en espaçant correctement et en élaguant au besoin."

    },
    {
      label: "Healthy",
      description: 'Description2',
      solution: 'Solution2'
    },

  ];
  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });
      if (res.status === 200) {
        setData(res.data);
      }
      setIsloading(false);
    }
  }

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(0);
    let bar = document.getElementById('bar');
    bar.classList.remove('w-0');
    bar.classList.add(`w-[${confidence}%]`);

    description = dataArray.filter(item => item.label === data.class);
    console.log('data2',)
  }
  // document.addEventListener("DOMContentLoaded", function () {
  //   let bar = document.getElementById('bar');
  //   bar.classList.remove('w-0');
  //   bar.classList.add(`w-[10%]`);
  // });
  const scrollToAbout = () => {
    const targetDiv = document.getElementById('about');

    if (targetDiv) {
      targetDiv.scrollIntoView({
        behavior: 'smooth', // Optional: Add smooth scrolling
        block: 'start',     // Optional: Align the top of the element with the top of the visible area
      });
    }
  };
  const scrollToDoc = () => {
    const targetDiv = document.getElementById('doc');

    if (targetDiv) {
      targetDiv.scrollIntoView({
        behavior: 'smooth', // Optional: Add smooth scrolling
        block: 'start',     // Optional: Align the top of the element with the top of the visible area
      });
    }
  };
  const scrollToHome = () => {
    const targetDiv = document.getElementById('home');

    if (targetDiv) {
      targetDiv.scrollIntoView({
        behavior: 'smooth', // Optional: Add smooth scrolling
        block: 'start',     // Optional: Align the top of the element with the top of the visible area
      });
    }
  };

  return (
    <React.Fragment>

      <div className="fixed inset-0 z-50 flex flex-col h-16 bg-[#FFFFFF] border">
        <div id="header" className='flex justify-between items-center  h-full border-[#343536] pr-4 lg:ml-2' >
          <div id="leftHeader" className='flex   ml-2 items-center'>
            <img className='w-12 h-12' src="/logo.png" />
          </div>
          <div id="rightheader" className='flex space-x-4  items-center'>
            <h1 onClick={scrollToHome} className='text-black text-md cursor-pointer font-semibold hover:underline hover:underline-offset-2'  >Home</h1>
            <h1 onClick={scrollToAbout} className='text-black text-md cursor-pointer font-semibold hover:underline hover:underline-offset-2'  >About the app</h1>
            <h1 onClick={scrollToDoc} className='text-black text-md cursor-pointer font-semibold hover:underline hover:underline-offset-2'  >Documentation</h1>

          </div>
        </div>
      </div>

      <div className="flex-col ">
        <div id="home" className="sm-mx-auto bg-cover bg-center h-screen blur-background  sm:mt-1 mt-12 sm:mt-0 lg:flex h-screen overflow-hidden   bg-[#F0F2F5]  py-7 lg:py-16" style={{ backgroundImage: `url(${imagebg})` }}>

          <div className='flex   mt-4 ml-36 rounded-xl w-1/3 h-full sm:block '>
            <div className={`justify-end h-full rounded-xl flex ${image ? ('') : ('backdrop-filter backdrop-blur-sm bg-opacity-50 bg-[#F0F2F5]')}`}>
              {image && <div className="w-full h-full flex-col space-y-4">
                <img src={preview} className="w-full rounded-xl" />
                <div className="">
                  <button onClick={clearData} className="h-auto rounded-xl  p-6 text-lg w-full bg-white font-bold text-bold ">Clear</button>
                </div>
              </div>
              }
              {!image && <CardContent className="h-full align-center items-center justify-center" >
                <DropzoneArea
                  className='h-full'
                  acceptedFiles={['image/*']}
                  dropzoneText={"Insérer une image d'une feuille de pommier"}
                  onChange={onSelectFile}
                />
              </CardContent>}
            </div>
          </div>

          <div id="content" className={`${image ? ('overflow-y-scroll') : ('')} flex-col h-full  space-y-2  bg-white rounded-xl m-4 p-6 sm:w-2/3 mr-40 overflow-hidden `}>
            {image ? (
              <>
                <div className="flex space-x-2">
                  <h1 className=" font-bold ">Type de maladie :  </h1>
                  {data && (<h1 className="text-md font-bold text-[green]">{data.class}</h1>)}
                </div>
                <h1 className=" font-bold ">Confidence: </h1>

                <div className=" h-3.5 relative max-w-xl rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gray-200 absolute text-center text-sm text-white"></div>
                  <div id="bar" class="transition-all ease-out duration-1000 h-full bg-green-500 text-center font-bold text-xs text-white relative w-0">{confidence}%</div>

                </div>
                <div className="flex-col ">
                  <h1 className=" font-bold ">Description :</h1>
                  {data && (<h1>{dataArray[0].description}</h1>)}
                </div>
                <h1 className=" font-bold ">Résistance variétale :</h1>
                {data && (<h1>{dataArray[0].solution}</h1>)}
              </>
            ) : (
              <div className="flex-col items-center justify-center h-full w-full">
                <div className="flex items-center justify-center">
                  <img src={back} className="flex w-56 h-56" />
                </div>
                <p className="text-xl font-semibold text-center text-gray-500">
                  Bienvenue à votre application de détection des maladies de la pomme de terre. Veuillez soumettre une photo des feuilles de la pomme de terre pour évaluer toute présence de maladie, et nous identifierons le type de maladie avec des stratégies de gestion appropriées.

                </p>
              </div>
            )}

          </div>
        </div >
        <div id="about" className="flex-col h-screen w-full  space-y-2  bg-[#F0F2F5]  p-20  overflow-hidden ">
          <div className="flex bg-white w-full h-full rounded-xl border-gray-300 border">
            <div className="w-1/3 p-6">
              <img src={back2} className="" />
            </div>

            <div className="w-2/3 space-y-2 flex-col p-6 h-full">
              <h1 className="text-center text-xl font-bold">à propos de l'application</h1>
              <p className="font-semibold text-gray-400 text-lg">
                Votre application offre une approche pratique et accessible pour les agriculteurs qui peuvent désormais diagnostiquer les problèmes de santé de leurs plants en soumettant simplement des photos des feuilles. La capacité de déterminer le type de maladie grâce à l'analyse visuelle facilite une intervention rapide et ciblée.

                Pour améliorer davantage votre application, vous pourriez envisager d'intégrer des conseils de gestion spécifiques à chaque maladie détectée. Cela permettrait aux utilisateurs de prendre des mesures correctives précises pour minimiser les dommages. De plus, une fonctionnalité éducative fournissant des informations détaillées sur les maladies identifiées et des recommandations de bonnes pratiques agricoles pourrait renforcer l'impact de votre application.

                N'oubliez pas de mettre en avant la convivialité de l'interface et de garantir la précision des résultats de détection.


              </p>
            </div>
          </div>
        </div>
        <div id="doc" className="flex-col h-screen w-full  space-y-2  bg-[#F0F2F5]  p-20  overflow-hidden ">
          <div className="flex bg-white w-full h-full rounded-xl border-gray-300 border">
            <div className="w-1/3 p-6">
              <img src={back2} className="" />
            </div>

            <div className="w-2/3 space-y-2 flex-col p-6 h-full">
              <h1 className="text-center text-xl font-bold">Documentation</h1>
              <p className="font-semibold text-gray-400 text-lg">
                Votre application offre une approche pratique et accessible pour les agriculteurs qui peuvent désormais diagnostiquer les problèmes de santé de leurs plants en soumettant simplement des photos des feuilles. La capacité de déterminer le type de maladie grâce à l'analyse visuelle facilite une intervention rapide et ciblée.

                Pour améliorer davantage votre application, vous pourriez envisager d'intégrer des conseils de gestion spécifiques à chaque maladie détectée. Cela permettrait aux utilisateurs de prendre des mesures correctives précises pour minimiser les dommages. De plus, une fonctionnalité éducative fournissant des informations détaillées sur les maladies identifiées et des recommandations de bonnes pratiques agricoles pourrait renforcer l'impact de votre application.

                N'oubliez pas de mettre en avant la convivialité de l'interface et de garantir la précision des résultats de détection.


              </p>
            </div>
          </div>
        </div>

      </div>
    </React.Fragment >
  );
};
