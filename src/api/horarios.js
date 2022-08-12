import horarios from "../mock/horarios.json";

export const get = () => {
  try {
    const data = JSON.parse(localStorage.getItem("horarios"));
    let horarioData = [...horarios];
    if (data) {
      horarioData = [...horarioData, ...data];
    }

    return horarioData;
  } catch (error) {
    throw Error("Internal Server Error");
  }
};

export const post = (nuevoHorario) => {
  try {
    let data = JSON.parse(localStorage.getItem("horarios"));
    if (!data) {
        localStorage.setItem("horarios", JSON.stringify([nuevoHorario]));
        data = JSON.parse(localStorage.getItem("horarios"));
    }
    data.push(nuevoHorario);
    localStorage.setItem("horarios", JSON.stringify(data));
    return;
  } catch (error) {
    throw Error("Internal Server Error");
  }
};

