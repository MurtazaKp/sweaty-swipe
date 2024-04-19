export default async function getDataFromJsonServer() {
  try {
    const response = await fetch(
      `https://json-server-goqt.onrender.com/intrestedPeople`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    console.log("response", res);
    if (response.ok) {
      return res;
      console.log("Card data posted to JSON server successfully");
    } else {
      console.error("Error posting card data to JSON server");
    }
  } catch (error) {
    console.error("Error posting card data to JSON server:", error);
  }
}
