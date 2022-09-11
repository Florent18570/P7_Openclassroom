import React from "react";
import Bienvenue from "./accueil/bienvenue";
import GetPost from "./accueil/postes";
class accueil extends React.Component {
  render() {
    return (
      <>
        <section className="bigContainer" id="bigContainer">
          <Bienvenue />
          <div className="containerPost">
            <GetPost />
          </div>
        </section>
      </>
    );
  }
}

export default accueil;
