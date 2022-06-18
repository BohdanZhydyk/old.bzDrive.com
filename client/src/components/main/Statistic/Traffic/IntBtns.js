
export const IntBtns = ({ props:{intervals, trafficFn} })=>{

  let SELECT_INT = (to)=> trafficFn({ type:"SELECT_INT", to })

  return(
    <section className="IntervalBtns flex evenly">
    {
      intervals.map( (int, n)=>{

        let key = `TrafficIntBtn${n}`
        let classes = `intervalBtn${int.act ? `Act` : ``} flex`

        return(
          <div className={classes} onClick={ ()=>SELECT_INT(int.to) } key={key}>
            {int.name}
          </div>
        )

      })
    }
    </section>
  )
}