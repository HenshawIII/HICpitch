import "server-only"
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token,
})

if(!writeClient.config().token) {
    throw new Error("Missing token")
}

// export const incrementViews = async (id:string) => {
//     await writeClient.patch(id).set({views:views+1}).commit()
// }