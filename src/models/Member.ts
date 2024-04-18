export interface Member {
  id?: string,
  firstName: string,
  lastName: string,
  email: string,
  roleId?: string, // should be multiple
  team: CondensedTeam
}
export interface MemberCreate {
  firstName: string,
  lastName: string,
  email: string,
  roleId?: string, // should be multiple
  teamId: string
}

export interface MemberUpdate {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  roleId?: string, // should be multiple
  teamId: string
}

export interface CondensedTeam {
  teamId: string,
  teamName: string
}
