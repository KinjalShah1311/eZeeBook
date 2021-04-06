// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Grid from '@material-ui/core/Grid';
// import Container from '@material-ui/core/Container';
// import MainFeaturedPost from './MainFeaturedPost';
// import FeaturedPost from './FeaturedPost';
// import Main from './Main';
// import post1 from './blog-post.1.md';
// import post2 from './blog-post.2.md';
// import post3 from './blog-post.3.md';

// const useStyles = makeStyles((theme) => ({
//   mainGrid: {
//     marginTop: theme.spacing(3),
//   },
// }));

// const sections = [
//   { title: 'Technology', url: '#' },
//   { title: 'Design', url: '#' },
//   { title: 'Culture', url: '#' },
//   { title: 'Business', url: '#' },
//   { title: 'Politics', url: '#' },
//   { title: 'Opinion', url: '#' },
//   { title: 'Science', url: '#' },
//   { title: 'Health', url: '#' },
//   { title: 'Style', url: '#' },
//   { title: 'Travel', url: '#' },
// ];

// const mainFeaturedPost = {
//   title: 'Title of a longer featured blog post',
//   description:
//     "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
//   image: 'https://source.unsplash.com/random',
//   imgText: 'main image description',
//   linkText: 'Continue reading…',
// };

// const featuredPosts = [
//   {
//     title: 'Featured post',
//     date: 'Nov 12',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random',
//     imageText: 'Image Text',
//   },
//   {
//     title: 'Post title',
//     date: 'Nov 11',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random',
//     imageText: 'Image Text',
//   },
// ];

// const posts = [post1, post2, post3];



// export default function Blog() {
//   const classes = useStyles();

//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <Container maxWidth="lg">
//         {/* <Header title="Blog" sections={sections} /> */}
//         <main>
//           <MainFeaturedPost post={mainFeaturedPost} />
//           <Grid container spacing={4}>
//             {featuredPosts.map((post) => (
//               <FeaturedPost key={post.title} post={post} />
//             ))}
//           </Grid>
//           <Grid container spacing={5} className={classes.mainGrid}>
//             <Main title="From the firehose" posts={posts} />
//             {/* <Sidebar
//               title={sidebar.title}
//               description={sidebar.description}
//               archives={sidebar.archives}
//               social={sidebar.social}
//             /> */}
//           </Grid>
//         </main>
//       </Container>
//     </React.Fragment>
//   );
// }