import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  return (
    <div
      className="flex flex-col small:items-start py-6 content-container"
      data-testid="category-container"
    >
      {/* <RefinementList sortBy={sort} data-testid="sort-by-container" /> */}
      {/* <div classNameName="w-full">
        <div classNameName="flex flex-row mb-8 text-2xl-semi gap-4">
          {parents &&
            parents.map((parent) => (
              <span key={parent.id} classNameName="text-ui-fg-subtle">
                <LocalizedClientLink
                  classNameName="mr-4 hover:text-black"
                  href={`/categories/${parent.handle}`}
                  data-testid="sort-by-link"
                >
                  {parent.name}
                </LocalizedClientLink>
                /
              </span>
            ))}
          <h1 data-testid="category-page-title">{category.name}</h1>
        </div>
        {category.description && (
          <div classNameName="mb-8 text-base-regular">
            <p>{category.description}</p>
          </div>
        )}
        {category.category_children && (
          <div classNameName="mb-8 text-base-large">
            <ul classNameName="grid grid-cols-1 gap-2">
              {category.category_children?.map((c) => (
                <li key={c.id}>
                  <InteractiveLink href={`/categories/${c.handle}`}>
                    {c.name}
                  </InteractiveLink>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={category.products?.length ?? 8}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div> */}
      <div
        className="relative bg-cover bg-center w-full h-[400px] flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "linear-gradient(360deg, rgba(44, 44, 45, 0.08) 1.88%, rgba(44, 44, 45, 0.34) 29.75%, rgba(44, 44, 45, 0.34) 61.75%, rgba(44, 44, 45, 0.18) 97.85%), url(https://sl3-cdn.karousell.com/homescreens/web/bg_cars_homescreen_sg.png)",
          backgroundSize: "cover", // Ensures the image covers the container
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
          backgroundPosition: "center", // Centers the image in the container
          borderRadius: "8px", // Optional: add rounded corners
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Optional: adds a shadow for better visibility
          margin: "16px auto", // Centers the container horizontally
        }}
      >
        <div className="space-y-4 px-4">
          <h1 className="text-3xl md:text-5xl font-bold  text-white ">
            Over 10,000 Used Cars in Singapore
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-4xl mx-auto">
            <select className="w-full md:w-1/5 p-3 rounded bg-gray-100 text-black outline-none">
              <option>Body</option>
            </select>
            <select className="w-full md:w-1/5 p-3 rounded bg-gray-100 text-black outline-none">
              <option>{"Depreciation: <10k"}</option>
            </select>
            <select className="w-full md:w-1/5 p-3 rounded bg-gray-100 text-black outline-none">
              <option>Price</option>
            </select>
            <input
              type="text"
              placeholder="Search for an item"
              className="w-full md:w-2/5 p-3 rounded bg-gray-100 text-black outline-none"
            />
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded">
              Search
            </button>
          </div>

          <p className="text-sm text-white">
            Trending: Volkswagen Scirocco, Honda Civic, Audi A3, Toyota Vios,
            Nissan GTR, Subaru Impreza, MINI Cooper, Suzuki Swift, Mitsubishi
            Lancer, Kia Cerato Forte, Mazda 3
          </p>
        </div>
      </div>

      <div className="py-10 px-5">
        <h2 className="text-2xl md:text-3xl text-center mb-8 font-bold">
          What would you like to find?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center  p-5 rounded-lg hover:bg-gray-700 transition">
            <img
              src="https://img.icons8.com/fluency/48/car.png"
              alt="Car Rental"
              className="mb-3"
            />
            <p className="font-semibold">Car Rental</p>
          </div>

          <div className="flex flex-col items-center  p-5 rounded-lg hover:bg-gray-700 transition">
            <img
              src="https://img.icons8.com/fluency/48/car.png"
              alt="Parallel Imports"
              className="mb-3"
            />
            <p className="font-semibold">Parallel Imports</p>
          </div>

          <div className="flex flex-col items-center  p-5 rounded-lg hover:bg-gray-700 transition">
            <img
              src="https://img.icons8.com/fluency/48/truck.png"
              alt="Commercial Vehicles"
              className="mb-3"
            />
            <p className="font-semibold">Commercial Vehicles</p>
          </div>

          <div className="flex flex-col items-center  p-5 rounded-lg hover:bg-gray-700 transition">
            <img
              src="https://img.icons8.com/fluency/48/car.png"
              alt="Car Accessories"
              className="mb-3"
            />
            <p className="font-semibold">Car Accessories</p>
          </div>

          <div className="flex flex-col items-center  p-5 rounded-lg hover:bg-gray-700 transition">
            <img
              src="https://img.icons8.com/fluency/48/motorbike.png"
              alt="Motorcycles"
              className="mb-3"
            />
            <p className="font-semibold">Motorcycles</p>
          </div>
        </div>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl mb-6 font-bold">Popular Brands</h2>
        <div className="flex overflow-x-auto gap-6 justify-start items-center px-4 lg:px-0">
          <div className="flex flex-col items-center">
            <img
              src="https://img.icons8.com/ios-filled/50/bmw.png"
              alt="BMW"
              className="w-16 h-16 rounded-full  className= p-2"
            />
            <p className="mt-2 text-sm font-semibold">BMW</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://img.icons8.com/ios-filled/50/volkswagen.png"
              alt="Volkswagen"
              className="w-16 h-16 rounded-full  className= p-2"
            />
            <p className="mt-2 text-sm font-semibold">Volkswagen</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 w-full">
        <div className="relative rounded-lg overflow-hidden  className= hover:shadow-lg transition">
          <img
            src="https://media.karousell.com/media/photos/special-collection/2024/12/13/e2bf3b5bbfd0b4c9_(1500,610)"
            alt="Ad 1"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="relative rounded-lg overflow-hidden  className= hover:shadow-lg transition">
          <img
            src="https://media.karousell.com/media/photos/special-collection/2024/12/13/e2bf3b5bbfd0b4c9_(1500,610)"
            alt="Ad 1"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl md:text-3xl mb-6 font-bold">
          Recently Listed Cars
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="rounded-lg overflow-hidden  className= hover:shadow-lg transition">
            <img
              src="https://via.placeholder.com/300x200.png?text=Car+1"
              alt="Car 1"
              className="w-full h-40 object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden  className= hover:shadow-lg transition">
            <img
              src="https://via.placeholder.com/300x200.png?text=Car+2"
              alt="Car 2"
              className="w-full h-40 object-cover"
            />
          </div>
        </div>
      </div>
      <Suspense
        fallback={
          <SkeletonProductGrid
            numberOfProducts={category.products?.length ?? 8}
          />
        }
      >
        <PaginatedProducts
          sortBy={sort}
          page={pageNumber}
          categoryId={category.id}
          countryCode={countryCode}
        />
      </Suspense>
    </div>
  )
}
