MONOFIX Sanity Studio
=====================

Edit home banners, gallery, client quotes, insights, case studies and material-price links here.
The live site reads this content. If Studio is not connected yet, the site still uses the JSON / public/home files.

1. Create a project at https://www.sanity.io/manage (free).
2. Copy the Project ID.
3. In the repo root, create `.env.local`:

   NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_READ_TOKEN=

   In `studio/.env`:

   SANITY_STUDIO_PROJECT_ID=yourProjectId
   SANITY_STUDIO_DATASET=production

4. From this folder:  npm install
5. npm run dev          → Studio at http://localhost:3333
6. Optional: npm run seed   (loads gallery images, quotes, insights, case studies, prices)

Add http://localhost:3000 (and the live site URL) under CORS origins in Sanity Manage, with credentials.

To rotate or highlight: set Status to Hidden / Published, Order, and Featured.
To swap a home banner: open Home banners and replace the image.
To update work samples: open Gallery, replace the image, and set Featured for the large home tile.
