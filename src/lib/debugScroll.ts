export function debugScroll(name = "debug") {
  return {
    markers: true,
    onEnter: () => console.log(`${name}: enter`),
    onLeave: () => console.log(`${name}: leave`),
    onEnterBack: () => console.log(`${name}: enterBack`),
    onLeaveBack: () => console.log(`${name}: leaveBack`),
  };
}
