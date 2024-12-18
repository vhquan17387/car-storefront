"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment, useEffect, useState } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SideMenu = ({ categories }: { categories: any[] | null }) => {
  const [openCategories, setOpenCategories] = useState({})

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }))
  }
  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                >
                  Menu
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transform transition ease-out duration-300"
                enterFrom="translate-x-full opacity-0"
                enterTo="translate-x-0 opacity-100"
                leave="transform transition ease-in duration-300"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="translate-x-full opacity-0"
              >
                {/* <PopoverPanel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm text-ui-fg-on-color m-2 backdrop-blur-2xl"> */}
                <PopoverPanel className="flex flex-col absolute w-full top-0 right-0 sm:w-1/4 h-screen z-30 text-sm text-ui-fg-on-color m-0 backdrop-blur-2xl">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-[rgba(3,7,18,0.5)] justify-start p-6"
                  >
                    <div className="flex justify-start pb-2" id="xmark">
                      <button data-testid="close-menu-button" onClick={close}>
                        <XMark />
                      </button>
                    </div>
                    <ul className="flex flex-col gap-6 items-start justify-start">
                      {categories
                        ?.filter((item) => !item.parent_category)
                        .map((category) => {
                          console.log(category)
                          return (
                            <li key={category.id} className="mb-2">
                              {/* Parent Category */}
                              <div
                                className="cursor-pointer font-bold text-2xl hover:text-ui-fg-disabled"
                                onClick={() => toggleCategory(category.id)}
                              >
                                {category.name}{" "}
                                {category.category_children.length > 0 &&
                                  (openCategories[category.id] ? "▼" : "▶")}
                              </div>

                              {/* Child Categories */}
                              {openCategories[category.id] &&
                                category.category_children.length > 0 && (
                                  <ul className="ml-6 mt-2">
                                    {category.category_children.map((child) => (
                                      <li key={child.id}>
                                        <LocalizedClientLink
                                          href={"/categories/" + child.handle}
                                          className="text-lg leading-8 hover:text-ui-fg-disabled"
                                          data-testid={`${child.name.toLowerCase()}-link`}
                                        >
                                          {child.name}
                                        </LocalizedClientLink>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                            </li>
                          )
                        })}
                    </ul>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
