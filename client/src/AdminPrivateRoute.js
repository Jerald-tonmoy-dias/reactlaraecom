import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import swal from "sweetalert";
import MastarLayout from "./layouts/admin/MastarLayout";

export default function AdminPrivateRoute({ ...rest }) {
  const history = useHistory();
  const [Authinticate, setAuthinticate] = useState(false);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("api/checkAuthinticate").then((res) => {
      if (res.status == 200) {
        setAuthinticate(true);
      }
      setLoading(false);
    });
    return () => {
      setAuthinticate(false);
    };
  }, []);

  //   unauthorized
  axios.interceptors.response.use(
    undefined,
    function axiosRetryInterceptors(err) {
      if (err.response.status == 401) {
        swal({
          title: "Unauthorized",
          text: err.response.data.message,
          icon: "warning",
        });
        history.push("/");
      }
      return Promise.reject(err);
    }
  );

  //  error
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status == 403) {
        swal({
          title: "Access Denied",
          text: error.response.data.message,
          icon: "warning",
        });
        history.push("/403");
      } else if (error.response.status == 404) {
        swal({
          title: "Page not found",
          text: error.response.data.message,
          icon: "warning",
        });
        history.push("/404");
      }

      return Promise.reject(error);
    }
  );

  if (Loading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }
  return (
    <Route
      {...rest}
      render={({ props, location }) =>
        Authinticate ? (
          <MastarLayout {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}
