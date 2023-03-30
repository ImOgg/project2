import React, { useState, useEffect } from 'react'
import Search from '../components/Search';
import axios from 'axios';
import Picture from '../components/Picture';
const Home = () => {
  let [data, setdata] = useState(null);
  let [input, setinput] = useState("");
  let [page, setpage] = useState(1);
  let [currentsearch, setcurrentsearch] = useState("");
  const auth = "dF65sYAkRhlG29FYWSmh9LYOwTPoeSoTk1E3OOhymAFb7GY0FiRrNwsA";
  const initURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  let searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;
  // 為了保持彈性 所以將url放入axios
  const search = async (url) => {
    let result = await axios.get(url, { headers: { Authorization: auth }, });
    setdata(result.data.photos);
    setcurrentsearch(input);
  };
  // 更多照片 因為閉包的關係 我們這個function 不會馬上被改變 可以直接在URL的值上直接+1
  const morePicture = async () => {
    let newURL;
    setpage(page + 1);
    if (currentsearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=15`
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentsearch}&per_page=15&page=${page + 1}`;
    }
    let result = await axios.get(newURL, { headers: { Authorization: auth }, });
    setdata(data.concat(result.data.photos));
  }
  // 在載入之前仔入initURL
  useEffect(() => {
    search(initURL);
  }, []);
  return (
    <div style={{ minHeight: '100vh' }}>
      <Search search={() => {
        search(searchURL)
      }} setinput={setinput} />
      <div className='pictures'>
        {data &&
          data.map((d) => {
            return <Picture data={d} />
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>更多圖片</button>
      </div>
    </div>
  )
}

export default Home