import {defineQuery} from 'next-sanity'

export const getStartups = defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    author->{name,bio,image,_id},
    description,
    views,
    category,
    image,  
}`)

export const getStartupById = defineQuery(`*[_type == "startup" && _id==$id][0]{
  _id,
  title,
  slug,
  _createdAt,
  author ->{
    _id,
    name,
    username,
    image,
    bio
  },
    views,
    description,
    category,
    image,
    pitch
}

`)

export const getStartupByViews = defineQuery(`*[_type=="startup" && _id==$id][0]{
    _id,
    views
}`)

export const authorById = defineQuery(`*[_type=="author" && id==$id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}`)


export const getPlaylists = defineQuery(`*[_type == "playlist" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug,
    select[]->{
        _id,
        title,
        slug,
        _createdAt,
        author->{
            _id,
            name,
            slug,
            username,
            image,
            bio
        },
        views,
        description,
        category,
        image,
        pitch
    }
}`)