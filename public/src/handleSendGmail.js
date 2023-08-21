document.querySelector('#form-gmail').addEventListener('submit', async function(e) {
    try {
        e.preventDefault()

        const gmail = this.querySelector('#inputGmail').value
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
        console.log('Отправлено')
    } catch (error) {
        console.log(error)
    }
})