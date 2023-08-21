document.querySelector('#form-gmail').addEventListener('submit', async function(e) {
    try {
        e.preventDefault()

        const inputGmail = this.querySelector('#inputGmail')
        const gmail = inputGmail.value
        inputGmail.value = ''
        const raw = JSON.stringify({ gmail })

        const reqHeaders = new Headers()
        reqHeaders.append('Content-Type', 'application/json')

        const resp = await fetch('/api/send-movies', {
            method: 'POST',
            headers: reqHeaders,
            body: raw
        })
    
        if(!resp.ok) {
            throw new Error(`Form error status: ${resp.status}`)
        }
    } catch (error) {
        console.log(error)
    }
})