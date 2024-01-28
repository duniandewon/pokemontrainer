interface Extensions {
  path: string;
  code: string;
}

interface Error {
  message: string;
  extensions: Extensions;
}

export function GraphQLAdapter(baseURL: string) {
  const request = async <Response, Variables>(
    query: string,
    variables: Variables
  ) => {
    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: { data: Response; errors?: Error[] } = await response.json();

      if (data.errors) {
        console.log("data.errors", data.errors);
        throw new Error(data.errors.map((error) => error.message).join("\n"));
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  return request;
}
