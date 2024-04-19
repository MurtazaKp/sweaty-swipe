export default async function postDataToJsonServer(cardData: any) {
  try {
    const response = await fetch(
      `https://json-server-goqt.onrender.com/intrestedPeople`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
      }
    );

    if (response.ok) {
      console.log("Card data posted to JSON server successfully");
    } else {
      console.error("Error posting card data to JSON server");
    }
  } catch (error) {
    console.error("Error posting card data to JSON server:", error);
  }
}
