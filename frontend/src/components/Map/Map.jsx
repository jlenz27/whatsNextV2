import React from 'react';
import GoogleMapReact from 'google-map-react';
// import { Paper, Typography, useMediaQuery } from '@material-ui/core';

import Typography from '@mui/material/Typography';

import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'

import useStyles from './styles.js';

const Map = ({ coordinates, setCoordinates, setBounds, places, setChildClicked }) => {
    const isDesktop = useMediaQuery('(min-width:600px)');
    const classes = useStyles();


        return (
            <div className={classes.mapContainer}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyD7nvEsIId1Zg5Sh4BNNTL_1iG0Q5i7cwg' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={(e) => {
                    setCoordinates ({ lat: e.center.lat, lng: e.center.lng});
                    setBounds ({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
                }}
                onChildClick={(child) => setChildClicked(child)}
              >
                {places?.map((place , i) => (
                  <div
                  className={classes.markerContainer}
                  lat={Number(place.latitude)}
                  lng={Number(place.longitude)}
                  key={i}
                >
                  {
                    !isDesktop ? (
                      <LocationOnOutlinedIcon color="primary" fontSize='Large'/>
                    ) : (
                      <Paper elevation ={3} className={classes.paper}>
                            <Typography className={classes.typography} variant="subtitle2" gutterbottom>
                              {place.name}
                            </Typography>
                        <img
                          className={classes.pointer}
                          src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}                       
                          alt ={place.name}
                          />       
                                             
                      </Paper>
                    )
                  }
                  </div>
               
                ))}
                </GoogleMapReact>
            </div>
        );
}          
        
        export default Map;