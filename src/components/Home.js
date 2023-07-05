import { styled } from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const recommendsRef = useRef([]);
  const newDisneysRef = useRef([]);
  const originalsRef = useRef([]);
  const trendingRef = useRef([]);

  useEffect(() => {
    console.log("hello");
    db.collection("movies").onSnapshot((snapshot) => {
      const newRecommends = [];
      const newNewDisneys = [];
      const newOriginals = [];
      const newTrending = [];

      snapshot.docs.forEach((doc) => {
        console.log(recommendsRef.current);
        const movieData = { id: doc.id, ...doc.data() };

        switch (movieData.type) {
          case "recommend":
            newRecommends.push(movieData);
            break;

          case "new":
            newNewDisneys.push(movieData);
            break;

          case "original":
            newOriginals.push(movieData);
            break;

          case "trending":
            newTrending.push(movieData);
            break;

          default:
            break;
        }
      });

      recommendsRef.current = newRecommends;
      newDisneysRef.current = newNewDisneys;
      originalsRef.current = newOriginals;
      trendingRef.current = newTrending;

      dispatch(
        setMovies({
          recommend: recommendsRef.current,
          newDisney: newDisneysRef.current,
          original: originalsRef.current,
          trending: trendingRef.current,
        })
      );
    });
  }, [userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
