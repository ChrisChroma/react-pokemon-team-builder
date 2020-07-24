import React, { Component } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import "./App.css";
import NavBar from "../../components/NavBar/NavBar";
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import userService from "../../services/userService";
import { getAllPokemon } from "../../services/pokemon-api";
import PokedexPage from "../PokedexPage/PokedexPage";
import TeamsPage from "../Teams/TeamsPage";
import TrainerProfilePage from "../TrainerProfilePage/TrainerProfilePage";

class App extends Component {
  state = {
    user: userService.getUser(),
    pokemon: [],
  };

  async componentDidMount() {
    console.log(this.state.user);
    const pokemon = await getAllPokemon();
    this.setState({ pokemon: pokemon.allPokemon });
  }

  getPokemon = (idx) => {
    return this.state.pokemon[idx];
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  render() {
    return (
      <>
        <NavBar user={this.state.user} handleLogout={this.handleLogout} />
        <div className="App">
          <Route
            exact
            path="/signup"
            render={({ history }) => (
              <SignupPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={({ history }) => (
              <LoginPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={(props) => {
              return (
                <section>
                  {console.log(props)}
                  {this.state.pokemon.map((pokemon) => (
                    <Link
                      key={pokemon.name}
                      to={
                        props.location.state && props.location.state.teamId
                          ? {
                              pathname: `/pokemon/${pokemon._id}`,
                              state: { teamId: props.location.state.teamId },
                            }
                          : `/pokemon/${pokemon._id}`
                      }
                    >
                      {pokemon.name}
                    </Link>
                  ))}
                </section>
              );
            }}
          />
          <Route
            path="/pokemon/:idx"
            render={(props) => (
              <PokedexPage
                {...props}
                getPokemon={this.getPokemon}
                email={this.state.user.email}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/trainer/"
            render={({ history }) => (
              <TrainerProfilePage {...this.state.user} />
            )}
          />
          <Route exact path="/teams/" render={({ history }) => <TeamsPage />} />
        </div>
      </>
    );
  }
}

export default App;
