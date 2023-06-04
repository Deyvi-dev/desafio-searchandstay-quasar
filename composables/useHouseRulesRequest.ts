import { AxiosResponse } from "axios"
import api from "@/services/api"

export async function fetchHouseRules(): Promise<any[]> {
  try {
    const response: AxiosResponse<{
      data: { pagination: { total_pages: number }; entities: any[] }
    }> = await api.get("/house_rules")
    const totalPages = response.data.data.pagination.total_pages

    const requests: Promise<AxiosResponse<{ data: { entities: any[] } }>>[] = []
    for (let page = 2; page <= totalPages; page++) {
      requests.push(api.get(`/house_rules?page=${page}`))
    }

    const additionalResponses = await Promise.all(requests)
    const entities: any[] = response.data.data.entities

    additionalResponses.forEach((additionalResponse) => {
      entities.push(...additionalResponse.data.data.entities)
    })

    return entities
  } catch (error) {
    throw new Error()
  }
}

export async function createHouseRule(name: string): Promise<any> {
  const requestBody = {
    house_rules: {
      active: 1,
      name: name,
    },
  }

  try {
    const response = await api.post(
      "https://sys-dev.searchandstay.com/api/admin/house_rules",
      requestBody
    )

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
): Promise<any> {
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

export async function deleteHouseRule(id: number): Promise<any> {
  try {
    const response = await api.delete(`/house_rules/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error("Failed to delete house rule")
  }
}
