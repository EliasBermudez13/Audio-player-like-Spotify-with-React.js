import React, { useState, useEffect, useRef} from "react";

//create your first component
const Home = () => {
	const [playList, setplayList] = useState([]);
	const [iconStatus, setIconStatus] = useState("fa fa-play rounded-circle");
	let [position, setposition] = useState(0);
	const [repeat, setrepeat] = useState(false);
	let songUrl = useRef();
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				console.log(data);
				return setplayList(data)
			})
	}, [])

	function songSelect(url, index){
		if(songUrl.current.paused){
			songUrl.current.src = `https://assets.breatheco.de/apis/sound/${url}`;
			songUrl.current.play();
			setIconStatus("fa fa-pause rounded-circle");
		} 
		else{
			songUrl.current.pause()
		}
		setposition(index);
	}

	function changeIcon(){
		if(songUrl.current.paused){
			songUrl.current.play();
			setIconStatus("fa fa-pause rounded-circle");
		} else{
			songUrl.current.pause();
			setIconStatus("fa fa-play rounded-circle");
		}
	}

	function nextSong(){
		setposition(position++);
		songUrl.current.src = `https://assets.breatheco.de/apis/sound/${playList[position].url}`;
		songUrl.current.play();
	}

	function previousSong(){
		setposition(position--);
		songUrl.current.src = `https://assets.breatheco.de/apis/sound/${playList[position].url}`;
		songUrl.current.play();
	}

	const subirVolumen = () => {
		songUrl.current.volume += 0.10;
	  }
	const bajarVolumen = () => {
		songUrl.current.volume -= 0.10;
	}

	const repeatSong = () => {
		if (repeat === true){
			setrepeat(false);
		} else{
			setrepeat(true);
		}
	}

	return (
			<div className="container-text-center">
				<ul className="list-group group-flash h-auto">
					{playList.map((song, index) => <button className="btn btn-dark text-start rounded-0 border border-secondary border-opacity-25" type="button" key={index} onClick={() => songSelect(song.url, index)}>{index} {song.name} -</button>)}
				</ul>
				<div className= "d-flex justify-content-center bg-secondary bg-black sticky-bottom">
				<audio id="reproductor" ref={songUrl} loop={repeat}></audio>
				<button className="m-2 bg-black text-white" style= {{height: "30px"}} onClick={(bajarVolumen)}><i className="fas fa-volume-down mx-2" style= {{widgh: "50%", height: "25%"}}></i></button>
				<button className="m-2 bg-black text-white" style= {{height: "30px"}} onClick={(previousSong)}><i className="fa fa-backward mx-2" style= {{widgh: "50%", height: "25%"}}></i></button>
				<button className="m-2 bg-black text-white" style= {{height: "30px"}} onClick={(changeIcon)}><i className={iconStatus} style= {{widgh: "50%", height: "25%"}}></i></button>
				<button className="m-2 bg-black text-white" style= {{height: "30px"}} onClick={(nextSong)}><i className="fa fa-forward mx-2" style= {{widgh: "50%", height: "25%"}}></i></button>
				<button className="m-2 bg-black text-white" style= {{height: "30px"}} onClick={(subirVolumen)}><i className="mx-2 fas fa-volume-up" style= {{widgh: "50%", height: "25%"}}></i></button>
				
				<input id="repeat" type="checkbox" checked={repeat} onChange={repeatSong}/>
				<label className="mx-2 m-2 text-white" htmlFor="repeat"> Repeat</label>
			</div>
		</div>
	);

};

export default Home;
