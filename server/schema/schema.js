const graphql = require("graphql");
const GraphQLUUID = "graphql-type-uuid";
const db = require("../db");

const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLList
} = graphql;

var matches = [
  {
    id: "bfb6e3a3-0efa-4934-97e7-552a555f9373",
    type: "football",
    league: "premier league",
    hostid: "1add5f64-6efb-461d-80ed-382cdc1dba3f",
    guestid: "f4cde05e-580c-4c43-a42f-1eeee051e607"
  },
  {
    id: "db8446ed-6d48-47d3-a8b3-f87f62a9b596",
    type: "basketball",
    league: "ABA",
    hostid: "8101f746-0bbd-478a-a501-fe0e2ff9f173",
    guestid: "d61664cd-4112-4036-a08e-bbae1a2a6c39"
  }
];

var teams = [
  {
    id: "1add5f64-6efb-461d-80ed-382cdc1dba3f",
    type: "football",
    league: "premier league",
    name: "Chelsea"
  },
  {
    id: "f4cde05e-580c-4c43-a42f-1eeee051e607",
    type: "football",
    league: "premier league",
    name: "Liverpool"
  },
  {
    id: "8101f746-0bbd-478a-a501-fe0e2ff9f173",
    type: "basketball",
    league: "ABA",
    name: "Crvena Zvezda"
  },
  {
    id: "d61664cd-4112-4036-a08e-bbae1a2a6c39",
    type: "basketball",
    league: "ABA",
    name: "Partizan"
  }
];

const MyType = new GraphQLObjectType({
  name: "MyType",
  fields: {
    myField: { type: GraphQLUUID }
  }
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    predictions: {
      type: new GraphQLList(PredictionType),
      resolve(parent, args) {
        //return
      }
    }
  })
});
const TeamType = new GraphQLObjectType({
  name: "Team",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    league: { type: GraphQLString },
    matchesHost: {
      type: new GraphQLList(MatchType),
      resolve(parent, args) {
        //return _.filter(matches, { hostid: parent.id });
        return db
          .any(
            `select *
            from tipsters.matches where hostid = '${parent.id}'  
            `
          )
          .then(function(data) {
            return data;
          })
          .catch(function(err) {
            return err;
          });
      }
    },
    matchesGuest: {
      type: new GraphQLList(MatchType),
      resolve(parent, args) {
        //return _.filter(matches, { guestid: parent.id });
        return db
          .any(
            `select *
          from tipsters.matches where guestid = '${parent.id}'  
          `
          )
          .then(function(data) {
            return data;
          })
          .catch(function(err) {
            return err;
          });
      }
    }
  })
});

const MatchType = new GraphQLObjectType({
  name: "Match",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    league: { type: GraphQLString },
    hostid: { type: GraphQLID },

    host: {
      type: TeamType,
      resolve(parent, args) {
        //return _.find(teams, { id: parent.hostid });
        return db
          .one(
            `select *
            from tipsters.teams where id = '${parent.hostid}'  
            `
          )
          .then(function(data) {
            return data;
          })
          .catch(function(err) {
            return err;
          });
      }
    },
    guest: {
      type: TeamType,
      resolve(parent, args) {
        return _.find(teams, { id: parent.guestid });
      }
    },
    predictions: {
      type: new GraphQLList(PredictionType),
      resolve(parent, args) {
        //return
      }
    }
  })
});

const PredictionType = new GraphQLObjectType({
  name: "Prediction",
  fields: () => ({
    id: { type: GraphQLID },
    score: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return db
          .one(
            `select *
            from tipsters.users where id = '${parent.userid}'  
            `
          )
          .then(function(data) {
            return data;
          })
          .catch(function(err) {
            return err;
          });
      }
    },
    match: {
      type: MatchType,
      resolve(parent, args) {
        return db
          .one(
            `select *
            from tipsters.matches where id = '${parent.matchid}'  
            `
          )
          .then(function(data) {
            return data;
          })
          .catch(function(err) {
            return err;
          });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    match: {
      type: MatchType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return db
          .one(
            `select *
          from tipsters.matches where id = '${args.id}'
          `
          )
          .then(function(data) {
            return data;
          })
          .catch(function(err) {
            return err;
          });
      }
    },
    prediction: {
      type: PredictionType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return db
          .one(
            `select *
          from tipsters.prediction where id = '${args.id}'
          `
          )
          .then(function(data) {
            return data;
          })
          .catch(function(err) {
            return err;
          });
      }
    },
    matches: {
      type: new GraphQLList(MatchType),
      resolve(parent, args) {
        return db
          .any(
            `select *
            from tipsters.matches 
            `
          )
          .then(function(data) {
            return data;
          })
          .catch(function(err) {
            return err;
          });
      }
    },
    predictions: {
      type: new GraphQLList(PredictionType),
      resolve(parent, args) {
        return db
          .any(
            `select *
            from tipsters.predictions 
            `
          )
          .then(function(data) {
            return data;
          })
          .catch(function(err) {
            return err;
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
