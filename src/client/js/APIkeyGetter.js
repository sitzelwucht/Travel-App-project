
export async function getAPIkey() {

    const response = await fetch('/api');
    try {
        const data = await response.json();
        return data;
   }
      catch (err) {
        console.log(err);
      }
  }
