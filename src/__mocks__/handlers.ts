import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("https://beta.pokeapi.co/graphql/v1beta", ({ request }) => {
    // const { limit, offset } = request.body;

    return HttpResponse.json({
      data: {
        pokemon_v2_berry: [
          {
            pokemon_v2_item: {
              id: 1,
              name: "bulbasaur-berry",
              pokemon_v2_itemsprites: {
                sprites: "https://example.com/bulbasaur-berry.png",
              },
            },
            pokemon_v2_berryfirmness: {
              name: "soft",
            },
          },
        ],
      },
    });
  }),
];
