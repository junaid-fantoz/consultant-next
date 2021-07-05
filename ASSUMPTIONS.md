# Assumptions

- Payloads inside launch data return an array of payloads, there is no specific mentions of that, i'm considering the first payload to display, like this, payloads: [{ payload_id: payloadId }].
- Although we can show all the payloads ids but for that we have to change the structure in the method - _launchDataTransform and also in the LaunchItem, where we are expecting a single payloadId
- If there is no launch success, it is considered to be a failed mission. 
- Assuming there can be no api failures since we are serving json files, I have not implemented error handling.

# Still to do

- Optimise/refactor of the filtering launches logic. It's not well tested, there can be potential bugs so that can be improved over time.
- Implement UI break errors, either in the componentDidCatch or try catch and api errors to display on UI.
- We could change the scss files to `Styled-Components` - that's what I prefer when comes to styling react components, Main reason that catches my attention is, it's more JS way of writing styles.

# Changes to the starter project

`These are the changes done w.r.t initial react assignment given.`
- Changed the Launches class component to hook as that is more readable to me, i always use hooks from the time they got introduced, and is also recommended by the React community.
- Have used a couple of libraries,
- axios: for better and consistent handling for AJAX calls
- and moment: for handling dates and times seamlessly, it's tested accross multiple browsers, we can use native datetime, but that is kinda time consuming and there are chances to face potential bugs across browsers like Safari (I had faced this in the past.)
- Have refactored LaunchItem component in such a way that all the links are now being iterated and 'LINKS' array contains the link and the label name, just to be more readable and extendable without repeating stuff.
- Transformed the launchdata in componentDidMount instead of render method, since that makes more sense to transform the data as soon as we get the result from the api.

`These are the changes after migrating to NextJS`
- Changed the global styles location to components, since it's added in `next.config.js`, we can change this later.
- Changed the styles of React-Select since there were some issues, it was not picking up Sass file, added customStyles through `style` props.
- Added the assets to public since that's how `next` recommends.
- `Used Next's <Image />` instead of html image tag, as it has many cool features like caching, image quality and much more and is recommended by Next.
- Added the domain allowed for the hosted image.
- `Launches` api logic is implemented in *`getStaticProps`* api as we can write server side logic in there, including database queries, it's called at build time and only once when the bundle is built.
- `LaunchPads` api is called on client side just to make it separate, i have not changed that, since this is kinda same to implement as Launches, so we can park this for later.
