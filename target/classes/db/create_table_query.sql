
CREATE SEQUENCE file_no_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2198 (class 0 OID 0)
-- Dependencies: 182
-- Name: SEQUENCE file_no_seq; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON SEQUENCE file_no_seq IS '파일관리시퀀스';


--
-- TOC entry 196 (class 1259 OID 29785)
-- Name: menu_no_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE menu_no_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2199 (class 0 OID 0)
-- Dependencies: 196
-- Name: SEQUENCE menu_no_seq; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON SEQUENCE menu_no_seq IS '메뉴리스트시퀀스';


--
-- TOC entry 189 (class 1259 OID 28534)
-- Name: notice_no_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE notice_no_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2200 (class 0 OID 0)
-- Dependencies: 189
-- Name: SEQUENCE notice_no_seq; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON SEQUENCE notice_no_seq IS '공지사항시퀀스';


--
-- TOC entry 193 (class 1259 OID 29652)
-- Name: recsroom_no_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE recsroom_no_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2201 (class 0 OID 0)
-- Dependencies: 193
-- Name: SEQUENCE recsroom_no_seq; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON SEQUENCE recsroom_no_seq IS '자료실';


--
-- TOC entry 195 (class 1259 OID 29781)
-- Name: req_no_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE req_no_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2202 (class 0 OID 0)
-- Dependencies: 195
-- Name: SEQUENCE req_no_seq; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON SEQUENCE req_no_seq IS '요청게시판시퀀스';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 185 (class 1259 OID 28495)
-- Name: tb_auth; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tb_auth (
    authorities character varying(20) NOT NULL,
    auth_nm character varying(20),
    rem character varying(200)
);


--
-- TOC entry 2203 (class 0 OID 0)
-- Dependencies: 185
-- Name: TABLE tb_auth; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE tb_auth IS '권한테이블';


--
-- TOC entry 2204 (class 0 OID 0)
-- Dependencies: 185
-- Name: COLUMN tb_auth.authorities; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_auth.authorities IS '권한';


--
-- TOC entry 2205 (class 0 OID 0)
-- Dependencies: 185
-- Name: COLUMN tb_auth.auth_nm; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_auth.auth_nm IS '그룹명';


--
-- TOC entry 2206 (class 0 OID 0)
-- Dependencies: 185
-- Name: COLUMN tb_auth.rem; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_auth.rem IS '비고';


--
-- TOC entry 187 (class 1259 OID 28517)
-- Name: tb_cmmn_menu; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tb_cmmn_menu (
    menu_code character varying(50) NOT NULL,
    menu_nm character varying(30) NOT NULL,
    menu_url character varying(200) NOT NULL,
    upper_menu_code character varying(50) NOT NULL,
    upper_menu_code2 character varying(50)
);


--
-- TOC entry 2207 (class 0 OID 0)
-- Dependencies: 187
-- Name: TABLE tb_cmmn_menu; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE tb_cmmn_menu IS '공통메뉴';


--
-- TOC entry 2208 (class 0 OID 0)
-- Dependencies: 187
-- Name: COLUMN tb_cmmn_menu.menu_code; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_cmmn_menu.menu_code IS '메뉴코드';


--
-- TOC entry 2209 (class 0 OID 0)
-- Dependencies: 187
-- Name: COLUMN tb_cmmn_menu.menu_nm; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_cmmn_menu.menu_nm IS '메뉴이름';


--
-- TOC entry 2210 (class 0 OID 0)
-- Dependencies: 187
-- Name: COLUMN tb_cmmn_menu.menu_url; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_cmmn_menu.menu_url IS '메뉴URL';


--
-- TOC entry 2211 (class 0 OID 0)
-- Dependencies: 187
-- Name: COLUMN tb_cmmn_menu.upper_menu_code; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_cmmn_menu.upper_menu_code IS '1차상위메뉴코드';


--
-- TOC entry 2212 (class 0 OID 0)
-- Dependencies: 187
-- Name: COLUMN tb_cmmn_menu.upper_menu_code2; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_cmmn_menu.upper_menu_code2 IS '2차상위메뉴코드';


--
-- TOC entry 186 (class 1259 OID 28501)
-- Name: tb_cmmn_menu_group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tb_cmmn_menu_group (
    authorities character varying(20),
    menu_code character varying(20),
    reg_date character varying
);


--
-- TOC entry 2213 (class 0 OID 0)
-- Dependencies: 186
-- Name: TABLE tb_cmmn_menu_group; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE tb_cmmn_menu_group IS '공통메뉴그룹';


--
-- TOC entry 2214 (class 0 OID 0)
-- Dependencies: 186
-- Name: COLUMN tb_cmmn_menu_group.authorities; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_cmmn_menu_group.authorities IS '권한';


--
-- TOC entry 2215 (class 0 OID 0)
-- Dependencies: 186
-- Name: COLUMN tb_cmmn_menu_group.menu_code; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_cmmn_menu_group.menu_code IS '메뉴코드';


--
-- TOC entry 2216 (class 0 OID 0)
-- Dependencies: 186
-- Name: COLUMN tb_cmmn_menu_group.reg_date; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_cmmn_menu_group.reg_date IS '등록일자';


--
-- TOC entry 183 (class 1259 OID 28470)
-- Name: tb_file_info; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tb_file_info (
    file_no numeric NOT NULL,
    file_org_nm character varying,
    file_stre_nm character varying,
    file_stre_path character varying,
    file_size numeric,
    file_type character varying(20),
    file_extsn character varying(20)
);


--
-- TOC entry 2217 (class 0 OID 0)
-- Dependencies: 183
-- Name: TABLE tb_file_info; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE tb_file_info IS '파일관리';


--
-- TOC entry 2218 (class 0 OID 0)
-- Dependencies: 183
-- Name: COLUMN tb_file_info.file_no; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_file_info.file_no IS '파일번호';


--
-- TOC entry 2219 (class 0 OID 0)
-- Dependencies: 183
-- Name: COLUMN tb_file_info.file_org_nm; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_file_info.file_org_nm IS '파일원본명칭';


--
-- TOC entry 2220 (class 0 OID 0)
-- Dependencies: 183
-- Name: COLUMN tb_file_info.file_stre_nm; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_file_info.file_stre_nm IS '파일저장명';


--
-- TOC entry 2221 (class 0 OID 0)
-- Dependencies: 183
-- Name: COLUMN tb_file_info.file_stre_path; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_file_info.file_stre_path IS '파일저장경로';


--
-- TOC entry 2222 (class 0 OID 0)
-- Dependencies: 183
-- Name: COLUMN tb_file_info.file_size; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_file_info.file_size IS '파일크기';


--
-- TOC entry 2223 (class 0 OID 0)
-- Dependencies: 183
-- Name: COLUMN tb_file_info.file_type; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_file_info.file_type IS '파일종류';


--
-- TOC entry 2224 (class 0 OID 0)
-- Dependencies: 183
-- Name: COLUMN tb_file_info.file_extsn; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_file_info.file_extsn IS '파일확장자';


--
-- TOC entry 191 (class 1259 OID 29640)
-- Name: tb_login_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tb_login_log (
    user_id character varying(30) NOT NULL,
    user_nm character varying,
    user_ip character varying,
    connect_date character varying,
    connect_time character varying(10)
);


--
-- TOC entry 2225 (class 0 OID 0)
-- Dependencies: 191
-- Name: TABLE tb_login_log; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE tb_login_log IS '접속로그';


--
-- TOC entry 2226 (class 0 OID 0)
-- Dependencies: 191
-- Name: COLUMN tb_login_log.user_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_login_log.user_id IS '아이디';


--
-- TOC entry 2227 (class 0 OID 0)
-- Dependencies: 191
-- Name: COLUMN tb_login_log.user_nm; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_login_log.user_nm IS '사용자이름';


--
-- TOC entry 2228 (class 0 OID 0)
-- Dependencies: 191
-- Name: COLUMN tb_login_log.user_ip; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_login_log.user_ip IS '사용자IP';


--
-- TOC entry 2229 (class 0 OID 0)
-- Dependencies: 191
-- Name: COLUMN tb_login_log.connect_date; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_login_log.connect_date IS '접속일자';


--
-- TOC entry 2230 (class 0 OID 0)
-- Dependencies: 191
-- Name: COLUMN tb_login_log.connect_time; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_login_log.connect_time IS '접속시간';


--
-- TOC entry 188 (class 1259 OID 28523)
-- Name: tb_notice; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tb_notice (
    notice_no numeric NOT NULL,
    title character varying NOT NULL,
    content character varying NOT NULL,
    writer character varying NOT NULL,
    wri_date character varying,
    file_no numeric,
    remove_stat character varying DEFAULT 'N'::character varying
);


--
-- TOC entry 2231 (class 0 OID 0)
-- Dependencies: 188
-- Name: TABLE tb_notice; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE tb_notice IS '공지사항';


--
-- TOC entry 2232 (class 0 OID 0)
-- Dependencies: 188
-- Name: COLUMN tb_notice.notice_no; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_notice.notice_no IS '일련번호';


--
-- TOC entry 2233 (class 0 OID 0)
-- Dependencies: 188
-- Name: COLUMN tb_notice.title; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_notice.title IS '제목';


--
-- TOC entry 2234 (class 0 OID 0)
-- Dependencies: 188
-- Name: COLUMN tb_notice.content; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_notice.content IS '내용';


--
-- TOC entry 2235 (class 0 OID 0)
-- Dependencies: 188
-- Name: COLUMN tb_notice.writer; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_notice.writer IS '작성자';


--
-- TOC entry 2236 (class 0 OID 0)
-- Dependencies: 188
-- Name: COLUMN tb_notice.wri_date; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_notice.wri_date IS '작성일시';


--
-- TOC entry 2237 (class 0 OID 0)
-- Dependencies: 188
-- Name: COLUMN tb_notice.file_no; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_notice.file_no IS '파일일련번호';


--
-- TOC entry 2238 (class 0 OID 0)
-- Dependencies: 188
-- Name: COLUMN tb_notice.remove_stat; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_notice.remove_stat IS '삭제상태여부 Y삭제 N사용';


--
-- TOC entry 192 (class 1259 OID 29643)
-- Name: tb_recsroom; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tb_recsroom (
    recsroom_no numeric NOT NULL,
    title character varying NOT NULL,
    content character varying NOT NULL,
    writer character varying NOT NULL,
    wri_date character varying,
    file_no numeric,
    remove_stat character varying DEFAULT 'N'::character varying
);


--
-- TOC entry 2239 (class 0 OID 0)
-- Dependencies: 192
-- Name: TABLE tb_recsroom; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE tb_recsroom IS '자료실';


--
-- TOC entry 2240 (class 0 OID 0)
-- Dependencies: 192
-- Name: COLUMN tb_recsroom.recsroom_no; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_recsroom.recsroom_no IS '일련번호';


--
-- TOC entry 2241 (class 0 OID 0)
-- Dependencies: 192
-- Name: COLUMN tb_recsroom.title; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_recsroom.title IS '제목';


--
-- TOC entry 2242 (class 0 OID 0)
-- Dependencies: 192
-- Name: COLUMN tb_recsroom.content; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_recsroom.content IS '내용';


--
-- TOC entry 2243 (class 0 OID 0)
-- Dependencies: 192
-- Name: COLUMN tb_recsroom.writer; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_recsroom.writer IS '작성자';


--
-- TOC entry 2244 (class 0 OID 0)
-- Dependencies: 192
-- Name: COLUMN tb_recsroom.wri_date; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_recsroom.wri_date IS '작성날짜';


--
-- TOC entry 2245 (class 0 OID 0)
-- Dependencies: 192
-- Name: COLUMN tb_recsroom.file_no; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_recsroom.file_no IS '파일번호';


--
-- TOC entry 2246 (class 0 OID 0)
-- Dependencies: 192
-- Name: COLUMN tb_recsroom.remove_stat; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_recsroom.remove_stat IS '삭제상태여부Y삭제N사용';


--
-- TOC entry 194 (class 1259 OID 29772)
-- Name: tb_reqboard; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tb_reqboard (
    req_no numeric NOT NULL,
    title character varying NOT NULL,
    content character varying NOT NULL,
    writer character varying NOT NULL,
    wri_date character varying,
    file_no numeric,
    remove_stat character varying DEFAULT 'N'::character varying
);


--
-- TOC entry 2247 (class 0 OID 0)
-- Dependencies: 194
-- Name: TABLE tb_reqboard; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE tb_reqboard IS '요청게시판';


--
-- TOC entry 2248 (class 0 OID 0)
-- Dependencies: 194
-- Name: COLUMN tb_reqboard.req_no; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_reqboard.req_no IS '일련번호';


--
-- TOC entry 2249 (class 0 OID 0)
-- Dependencies: 194
-- Name: COLUMN tb_reqboard.title; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_reqboard.title IS '제목';


--
-- TOC entry 2250 (class 0 OID 0)
-- Dependencies: 194
-- Name: COLUMN tb_reqboard.content; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_reqboard.content IS '내용';


--
-- TOC entry 2251 (class 0 OID 0)
-- Dependencies: 194
-- Name: COLUMN tb_reqboard.writer; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_reqboard.writer IS '작성자';


--
-- TOC entry 2252 (class 0 OID 0)
-- Dependencies: 194
-- Name: COLUMN tb_reqboard.wri_date; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_reqboard.wri_date IS '작성날짜';


--
-- TOC entry 2253 (class 0 OID 0)
-- Dependencies: 194
-- Name: COLUMN tb_reqboard.file_no; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_reqboard.file_no IS '파일번호';


--
-- TOC entry 2254 (class 0 OID 0)
-- Dependencies: 194
-- Name: COLUMN tb_reqboard.remove_stat; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_reqboard.remove_stat IS '삭제상태여부Y삭제N사용';


--
-- TOC entry 190 (class 1259 OID 29637)
-- Name: tb_system_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tb_system_log (
    user_id character varying(30) NOT NULL,
    user_ip character varying(30) NOT NULL,
    req_url character varying(50),
    req_date character varying(30),
    req_time character varying(30),
    req_url_nm character varying(30)
);


--
-- TOC entry 2255 (class 0 OID 0)
-- Dependencies: 190
-- Name: TABLE tb_system_log; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE tb_system_log IS '시스템로그';


--
-- TOC entry 2256 (class 0 OID 0)
-- Dependencies: 190
-- Name: COLUMN tb_system_log.user_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_system_log.user_id IS '아이디';


--
-- TOC entry 2257 (class 0 OID 0)
-- Dependencies: 190
-- Name: COLUMN tb_system_log.user_ip; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_system_log.user_ip IS '사용자IP';


--
-- TOC entry 2258 (class 0 OID 0)
-- Dependencies: 190
-- Name: COLUMN tb_system_log.req_url; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_system_log.req_url IS '요청URL';


--
-- TOC entry 2259 (class 0 OID 0)
-- Dependencies: 190
-- Name: COLUMN tb_system_log.req_date; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_system_log.req_date IS '요청일자';


--
-- TOC entry 2260 (class 0 OID 0)
-- Dependencies: 190
-- Name: COLUMN tb_system_log.req_time; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_system_log.req_time IS '요청시간';


--
-- TOC entry 2261 (class 0 OID 0)
-- Dependencies: 190
-- Name: COLUMN tb_system_log.req_url_nm; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_system_log.req_url_nm IS '요청url명';


--
-- TOC entry 181 (class 1259 OID 28437)
-- Name: tb_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tb_user (
    user_id character varying(20) NOT NULL,
    password character varying,
    pwcount numeric,
    email character varying,
    tel character varying,
    enabled character varying(10),
    name character varying(20),
    dept character varying(20)
);


--
-- TOC entry 2262 (class 0 OID 0)
-- Dependencies: 181
-- Name: COLUMN tb_user.user_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_user.user_id IS '아이디';


--
-- TOC entry 2263 (class 0 OID 0)
-- Dependencies: 181
-- Name: COLUMN tb_user.password; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_user.password IS '패스워드';


--
-- TOC entry 2264 (class 0 OID 0)
-- Dependencies: 181
-- Name: COLUMN tb_user.pwcount; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_user.pwcount IS '패스워드틀린횟수';


--
-- TOC entry 2265 (class 0 OID 0)
-- Dependencies: 181
-- Name: COLUMN tb_user.email; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_user.email IS '이메일';


--
-- TOC entry 2266 (class 0 OID 0)
-- Dependencies: 181
-- Name: COLUMN tb_user.tel; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_user.tel IS '전화번호';


--
-- TOC entry 2267 (class 0 OID 0)
-- Dependencies: 181
-- Name: COLUMN tb_user.enabled; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_user.enabled IS '사용여부';


--
-- TOC entry 2268 (class 0 OID 0)
-- Dependencies: 181
-- Name: COLUMN tb_user.name; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_user.name IS '이름';


--
-- TOC entry 2269 (class 0 OID 0)
-- Dependencies: 181
-- Name: COLUMN tb_user.dept; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_user.dept IS '부서';


--
-- TOC entry 184 (class 1259 OID 28484)
-- Name: tb_user_auth; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tb_user_auth (
    user_id character varying,
    authorities character varying(20)
);


--
-- TOC entry 2270 (class 0 OID 0)
-- Dependencies: 184
-- Name: TABLE tb_user_auth; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE tb_user_auth IS '유저권한';


--
-- TOC entry 2271 (class 0 OID 0)
-- Dependencies: 184
-- Name: COLUMN tb_user_auth.authorities; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN tb_user_auth.authorities IS '권한';

--
-- TOC entry 2179 (class 0 OID 28495)
-- Dependencies: 185
-- Data for Name: tb_auth; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO tb_auth (authorities, auth_nm, rem) VALUES ('ROLE_MEMBER', '담당자', NULL);
INSERT INTO tb_auth (authorities, auth_nm, rem) VALUES ('ROLE_TEST', '테스트', '');
INSERT INTO tb_auth (authorities, auth_nm, rem) VALUES ('ROLE_USER', '사용자', '');
INSERT INTO tb_auth (authorities, auth_nm, rem) VALUES ('ROLE_ADMIN', '관리자', '');


--
-- TOC entry 2181 (class 0 OID 28517)
-- Dependencies: 187
-- Data for Name: tb_cmmn_menu; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO tb_cmmn_menu (menu_code, menu_nm, menu_url, upper_menu_code, upper_menu_code2) VALUES ('090000', '열린마당', '/openYard/all/list.do', '09', '');
INSERT INTO tb_cmmn_menu (menu_code, menu_nm, menu_url, upper_menu_code, upper_menu_code2) VALUES ('090100', '공지사항', '', '09', '');
INSERT INTO tb_cmmn_menu (menu_code, menu_nm, menu_url, upper_menu_code, upper_menu_code2) VALUES ('090101', '공지사항관리', '/openYard/notice/list.do', '09', '0901');
INSERT INTO tb_cmmn_menu (menu_code, menu_nm, menu_url, upper_menu_code, upper_menu_code2) VALUES ('090200', '자료실', '', '09', '');
INSERT INTO tb_cmmn_menu (menu_code, menu_nm, menu_url, upper_menu_code, upper_menu_code2) VALUES ('090201', '자료실관리', '/openYard/recsroom/list.do', '09', '0902');
INSERT INTO tb_cmmn_menu (menu_code, menu_nm, menu_url, upper_menu_code, upper_menu_code2) VALUES ('090300', '요청게시판', '', '09', '');
INSERT INTO tb_cmmn_menu (menu_code, menu_nm, menu_url, upper_menu_code, upper_menu_code2) VALUES ('090301', '요청게시판관리', '/openYard/req/list.do', '09', '0903');
INSERT INTO tb_cmmn_menu (menu_code, menu_nm, menu_url, upper_menu_code, upper_menu_code2) VALUES ('010000', '정보지도', '/map/map.do', '01', '');


--
-- TOC entry 2180 (class 0 OID 28501)
-- Dependencies: 186
-- Data for Name: tb_cmmn_menu_group; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO tb_cmmn_menu_group (authorities, menu_code, reg_date) VALUES ('ROLE_ADMIN', '090000', '20200603');
INSERT INTO tb_cmmn_menu_group (authorities, menu_code, reg_date) VALUES ('ROLE_ADMIN', '090100', '20200603');
INSERT INTO tb_cmmn_menu_group (authorities, menu_code, reg_date) VALUES ('ROLE_ADMIN', '090101', '20200603');
INSERT INTO tb_cmmn_menu_group (authorities, menu_code, reg_date) VALUES ('ROLE_ADMIN', '090200', '20200603');
INSERT INTO tb_cmmn_menu_group (authorities, menu_code, reg_date) VALUES ('ROLE_ADMIN', '090201', '20200603');
INSERT INTO tb_cmmn_menu_group (authorities, menu_code, reg_date) VALUES ('ROLE_ADMIN', '090300', '20200603');

--
-- TOC entry 2175 (class 0 OID 28437)
-- Dependencies: 181
-- Data for Name: tb_user; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO tb_user (user_id, password, pwcount, email, tel, enabled, name, dept) VALUES ('owner', 'f3db445755bb00e40615249a5a1e4d644d87055667774efa0c39e470793b0d26ddd603b40dba89358c44b8291643a2b6d0355f6b1fbfdf3f3580b2d3eb851087', NULL, '', '', '1', '관리자', '1');

--
-- TOC entry 2178 (class 0 OID 28484)
-- Dependencies: 184
-- Data for Name: tb_user_auth; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO tb_user_auth (user_id, authorities) VALUES ('owner', 'ROLE_ADMIN');

--
-- TOC entry 2047 (class 2606 OID 29808)
-- Name: tb_cmmn_menu_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tb_cmmn_menu
    ADD CONSTRAINT tb_cmmn_menu_pk PRIMARY KEY (menu_code);


--
-- TOC entry 2043 (class 2606 OID 28477)
-- Name: tb_file_info_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tb_file_info
    ADD CONSTRAINT tb_file_info_pkey PRIMARY KEY (file_no);


--
-- TOC entry 2045 (class 2606 OID 28505)
-- Name: tb_group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tb_auth
    ADD CONSTRAINT tb_group_pkey PRIMARY KEY (authorities);


--
-- TOC entry 2049 (class 2606 OID 28533)
-- Name: tb_notice_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tb_notice
    ADD CONSTRAINT tb_notice_pkey PRIMARY KEY (notice_no);


--
-- TOC entry 2051 (class 2606 OID 29651)
-- Name: tb_recsroom_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tb_recsroom
    ADD CONSTRAINT tb_recsroom_pkey PRIMARY KEY (recsroom_no);


--
-- TOC entry 2053 (class 2606 OID 29780)
-- Name: tb_reqboard_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tb_reqboard
    ADD CONSTRAINT tb_reqboard_pkey PRIMARY KEY (req_no);


--
-- TOC entry 2041 (class 2606 OID 28446)
-- Name: userid; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tb_user
    ADD CONSTRAINT userid PRIMARY KEY (user_id);


--
-- TOC entry 2056 (class 2606 OID 29842)
-- Name: tb_cmmn_menu_group_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tb_cmmn_menu_group
    ADD CONSTRAINT tb_cmmn_menu_group_fk FOREIGN KEY (authorities) REFERENCES tb_auth(authorities);


--
-- TOC entry 2057 (class 2606 OID 29847)
-- Name: tb_cmmn_menu_group_fk2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tb_cmmn_menu
    ADD CONSTRAINT tb_cmmn_menu_group_fk2 FOREIGN KEY (menu_code) REFERENCES tb_cmmn_menu(menu_code);


--
-- TOC entry 2058 (class 2606 OID 29790)
-- Name: tb_notice_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tb_notice
    ADD CONSTRAINT tb_notice_fk FOREIGN KEY (file_no) REFERENCES tb_file_info(file_no);


--
-- TOC entry 2059 (class 2606 OID 29795)
-- Name: tb_recsroom_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tb_recsroom
    ADD CONSTRAINT tb_recsroom_fk FOREIGN KEY (file_no) REFERENCES tb_file_info(file_no);


--
-- TOC entry 2060 (class 2606 OID 29800)
-- Name: tb_reqboard_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tb_reqboard
    ADD CONSTRAINT tb_reqboard_fk FOREIGN KEY (file_no) REFERENCES tb_file_info(file_no);


--
-- TOC entry 2055 (class 2606 OID 29857)
-- Name: tb_user_auth_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tb_user_auth
    ADD CONSTRAINT tb_user_auth_fk FOREIGN KEY (user_id) REFERENCES tb_user(user_id);


--
-- TOC entry 2054 (class 2606 OID 29852)
-- Name: tb_user_auth_fk2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tb_user_auth
    ADD CONSTRAINT tb_user_auth_fk2 FOREIGN KEY (authorities) REFERENCES tb_auth(authorities);


-- Completed on 2020-06-10 09:42:55

--
-- PostgreSQL database dump complete
--

