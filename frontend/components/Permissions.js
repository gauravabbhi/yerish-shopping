import React, {Component} from 'react';
import Proptypes from 'prop-types';
import {Mutation, Query} from "react-apollo";
import Error from './GraphqlErrorMessage';
import gql from 'graphql-tag';
import {withStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import {Button, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Loading from "./Loading";

const possiblePermissions = [
    'ADMIN',
    'USER',
    'ITEMCREATE',
    'ITEMUPDATE',
    'ITEMDELETE',
    'PERMISSIONUPDATE'
];

const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation updatePermissions($permission: [Permission],$userId: ID!) {
        updatePermissions(permissions:$permission, userId: $userId){
            id
            permission
            name
            email
        }
    }
`;

const ALL_USERS_QUERY = gql`
    query {
        users{
            id
            name
            email
            permission
        }
    }
`;

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit,
        overflowX: 'auto',
    },
    container: {
        padding: theme.spacing.unit,
        margin: theme.spacing.unit
    },
    button: {
        ...theme.palette.midNight,
    },
    table: {
        // minWidth: 700,
    },
    tableHeader: {
        ...theme.palette.dayLight,
    },
    tableCell: {
        borderRight: "1px solid rgba(224, 224, 224, 1)"
    }
});

const Permissions = props => {
    const {classes} = props;
    return (
        <Query query={ALL_USERS_QUERY}>
            {({data, loading, error}) => {
                if (error) return <Error error={error}/>;
                if (loading) return <Loading/>;
                return <>
                    <Grid className={classes.container} item md={12}>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.tableCell} align="center">
                                            <Typography>Name</Typography></TableCell>
                                        <TableCell className={classes.tableCell} align="center">
                                            <Typography>Email</Typography></TableCell>
                                        {possiblePermissions.map((permission, index) =>
                                            <TableCell key={index} className={classes.tableCell} align="center">
                                                <Typography>{permission}</Typography>
                                            </TableCell>
                                        )}
                                        <TableCell className={classes.tableCell} align="center">
                                            <Typography>Update</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.users.length > 0 && data.users.map((user, index) =>
                                        <UserPermissions key={index} user={user} classes={classes}/>
                                    )}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </>
            }
            }
        </Query>
    );
};


class UserPermissions extends Component {
    static propTypes = {
        user: Proptypes.shape({
            name: Proptypes.string,
            email: Proptypes.string,
            id: Proptypes.string,
            permission: Proptypes.array,
        }).isRequired
    };

    state = {
        permissions: this.props.user.permission
    };

    handlePermissionChange = e => {
        const checkbox = e.target;
        //take a copy of current permissions
        let updatedPermissions = [...this.state.permissions];
        // figure out if we need to remove or add this permission
        if (checkbox.checked) {
            // add it in!
            updatedPermissions.push(checkbox.value);
        } else {
            updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
        }
        this.setState({permissions: updatedPermissions});
    };

    render() {
        let {user, classes} = this.props;
        return (
            <>
                <Mutation
                    mutation={UPDATE_PERMISSIONS_MUTATION}
                    variables={{
                        permission: this.state.permissions,
                        userId: this.props.user.id
                    }}>
                    {(updatePermissions, {loading, error}) => (

                        <>
                            {error && <tr><Error error={error}/></tr>}
                            <TableRow>
                                <TableCell component="th" scope="row" className={classes.tableCell}>
                                    <Typography>{user.name}</Typography>
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    <Typography>{user.email}</Typography>
                                </TableCell>
                                {possiblePermissions.map((permission, index) =>
                                    <TableCell key={index} className={classes.tableCell}>
                                        <label htmlFor={`${user.id}-permission-${permission}`}>
                                            <input type="checkbox"
                                                   checked={this.state.permissions.includes(permission)}
                                                   value={permission}
                                                   onChange={this.handlePermissionChange}
                                            />
                                        </label>
                                    </TableCell>
                                )}
                                <TableCell className={classes.tableCell}>
                                    <Button type="button"
                                            disabled={loading}
                                            size="small" className={classes.button}
                                            onClick={updatePermissions}

                                    >
                                        Update
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </>

                    )}
                </Mutation>
            </>
        );
    }
}

export default withStyles(styles)(Permissions);
