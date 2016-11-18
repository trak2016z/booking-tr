import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID
} from 'graphql';
import {
    GraphQLDateTime
} from 'graphql-custom-types';
import { GraphQLError } from 'graphql/error';

import userType from './users';
import Bookings from '../lib/bookings';

const passengerType = new GraphQLObjectType({
    name: 'Passenger',
    description: 'Representation of booking passenger.',
    fields: () => ({
        firstName: {
            description: 'Passenger first name',
            type: GraphQLString
        },
        lastName: {
            description: 'Passenger last name',
            type: GraphQLString
        }
    })
});

const bookingType = new GraphQLObjectType({
    name: 'Booking',
    description: 'Representation of booking.',
    fields: () => ({
        _id: {
            description: 'Booking unique id.',
            type: GraphQLID
        },
        departure: {
            description: 'Booking departure date.',
            type: GraphQLDateTime
        },
        arrival: {
            description: 'Booking arrival date.',
            type: GraphQLDateTime
        },
        from: {
            description: 'Booking departure station.',
            type: GraphQLString
        },
        to: {
            description: 'Booking arrival station.',
            type: GraphQLString
        },
        firstPassenger: {
            description: 'Booking holder.',
            type: userType
        },
        otherPassengers: {
            description: 'Passenger without booking holder (firstPassenger)',
            type: new GraphQLList(passengerType)
        }
    })
});

const _list = {
    description: 'Information about all bookings.',
    type: new GraphQLList(bookingType),
    resolve() {
        const bookings = new Bookings();
        return bookings.getList();
    }
};

const _create = {
    description: 'Create new booking',
    type: bookingType,
    // refactor to pass bookingType as arguments
    resolve(root, args) {
        const bookings = new Bookings();
        return bookings.create(args);
    }
};

export const bookingListField = _list;
export const bookingCreate = _create;
