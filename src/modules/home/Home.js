import React from 'react'
import Carousel from 'react-material-ui-carousel'
import HomeItem from './components/HomeItem'

function Home() {
    var items = [
        {
            name: "Random Name #1",
           src:"https://picsum.photos/id/1011/800/400"
        },
        {
            name: "Random Name #2",
            src:"https://picsum.photos/id/1016/800/400"
           
        },
        {
            name: "Random Name #3",
            src:"https://picsum.photos/id/1015/800/400"
           
        }
    ]

    return (
        <Carousel>
            {
                items.map( item => <HomeItem item={item} /> )
            }
        </Carousel>
    )
 
}

export default Home
