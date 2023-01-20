import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { slice } from "lodash";
function List() {
  const [list, setList] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(9);
  const initialList = slice(list, 0, index);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);
  const fetchData = () => {
    fetch("https://equran.id/api/surat")
      .then((res) => res.json())
      .then((json) => setList(json))
      .catch((e) => console.log(e));
  };
  const loadMore = () => {
    setIndex(index + 9);
    console.log(index);
    if (index >= list.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 5000);
  }, []);
  const showCards = () => {
    return (
      <>
        {initialList.map((item) => {
          return (
            <div key={item.id} className="col-sm-4 card-group mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="text">{item.nama_latin}</h5>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  const showSkeleton = () => {
    return (
      <>
        {Array(9)
          .fill()
          .map((item, index) => {
            return (
              <div key={index} className="col-sm-4 card-group mb-4">
                <div className="card">
                  <Skeleton height={60} />
                </div>
              </div>
            );
          })}
      </>
    );
  };
  return (
    <div>
      <h2 className="mb-3">React Js Loading Skeleton Screen Example</h2>
      <button className="mb-3" onClick={toggleTheme}>
        Toggle Theme
      </button>
      <div className="row">
        {list.length > 0 ? showCards() : showSkeleton()}
      </div>
      <div className="d-grid mt-3 mb-5">
        {isCompleted ? (
          <button
            onClick={loadMore}
            type="button"
            className="btn btn-danger disabled"
          >
            <div class="spinner-grow" role="status">
              <span class="sr-only"></span>
            </div>
          </button>
        ) : (
          <button
            onClick={loadMore}
            type="button"
            className="btn btn-danger mx-auto"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
export default List;
