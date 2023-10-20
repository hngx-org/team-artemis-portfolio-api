import { Request, Response } from 'express'

export const countries = async (req: Request, res: Response) => {
    try {
        const countries = await fetch('https://restcountries.eu/rest/v2/all')
        res.status(200).json({ countries })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
    }