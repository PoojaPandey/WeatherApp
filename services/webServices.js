const webServices = async props => {
  try {
    const response = await fetch(props.url);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
  }
};

export default webServices;
