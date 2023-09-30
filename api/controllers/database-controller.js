
import * as databaseService from "./../services/database-service.js";


export const get = async (req, res) => {


  if (Object.keys(req.body).length != 0) {
    setResponse(res, 400);
    return;
  }


  const { status } = await databaseService.getConnection();

  if(status == 200){
    setResponse(res, 200);
  }else if(status == -61){
    setResponse(res, 503);
  }else if(status == -4078){
    setResponse(res, 503);
  }else{
    setResponse(res, 500);
  }
};

const setResponse = async (response, status, data) => {
  response
    .status(status)
    .header("cache-control", "no-cache, no-store, must-revalidate")
    .header("pragma", "no-cache")
    .json(data);
};
