import axios from "axios"

const token = localStorage.getItem("token")

const api = axios.create({
  baseURL: "https://sys-dev.searchandstay.com/api/admin",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export async function fetchHouseRules() {
  try {
    const response = await api.get("/house_rules")
    const totalPages = response.data.data.pagination.total_pages

    const requests = []
    for (let page = 2; page <= totalPages; page++) {
      requests.push(api.get(`/house_rules?page=${page}`))
    }

    const additionalResponses = await Promise.all(requests)
    const entities = response.data.data.entities

    additionalResponses.forEach((additionalResponse) => {
      entities.push(...additionalResponse.data.data.entities)
    })

    return entities
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function createHouseRule(name: string) {
  try {
    const response = await api.post("/house_rules", {
      house_rules: {
        name: name,
        active: 1,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error("Failed to create house rule")
  }
}
export async function updateHouseRule(
  id: number,
  name: string,
  active: number
) {
  try {
    const response = await api.put(`/house_rules/${id}`, {
      house_rules: {
        name: name,
        active: active,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error("Failed to update house rule")
  }
}

export async function deleteHouseRule(id: number) {
  try {
    const response = await api.delete(`/house_rules/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error("Failed to delete house rule")
  }
}
