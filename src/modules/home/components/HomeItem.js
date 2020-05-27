import React from 'react'
import Box from '@material-ui/core/Box';

function HomeItem({item}) {
    //console.log(item)
    return (
        
       <Box display="flex"  p={1}  justifyContent="center">
        <div>
        <h2>{item.name}</h2>

        <img src={item.src}></img>
        </div>
       </Box>
 
    )
}

export default HomeItem
